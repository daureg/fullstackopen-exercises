const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('returns the right amount of blogs as json', async () => {
  const numBlogsExpected = helper.initialBlogs.length
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => { if (res.body.length !== numBlogsExpected) {throw Error('not the right size')} })
})

afterAll(() => {
  mongoose.connection.close()
})
