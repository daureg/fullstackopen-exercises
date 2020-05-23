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

test('a blog has an "id" field', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0]['id']).toBeDefined()
})

test('can add of blog post with POST', async () => {
  const newBlog = { author: 'Michael', likes: 3, url: 'http://github.com/', title: 'Basketball' }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const content = response.body.filter(b => b.title === 'Basketball')[0]
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(content.author).toBe('Michael')
})


test('POSTing without like field set default value to 0', async () => {
  const newBlog = { author: 'Michael', url: 'http://github.com/', title: 'Basketball' }
  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  const content = response.body.filter(b => b.title === 'Basketball')[0]
  expect(content.likes).toBe(0)
})

test('', async () => {
})

afterAll(() => {
  mongoose.connection.close()
})
