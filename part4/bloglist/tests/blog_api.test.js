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

test('can only POST when title and url are present', async () => {
  const noTitle = { author: 'Michael', url: 'http://github.com/' }
  await api.post('/api/blogs').send(noTitle).expect(400)
  const noURL = { author: 'Michael', title: 'Basketball' }
  await api.post('/api/blogs').send(noURL).expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})
describe('update of a blog', () => {
  test('succeeds with status code 200 if id is valid, and likes is incremented', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initialLikes = blogToUpdate['likes']
    blogToUpdate['likes'] = initialLikes + 5
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const updatedBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id)[0]
    expect(updatedBlog['likes']).toBe(initialLikes + 5)
  })
})
test('', async () => {
})

afterAll(() => {
  mongoose.connection.close()
})
