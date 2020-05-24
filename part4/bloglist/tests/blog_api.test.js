const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

let userId = null
let loginInfo = null

beforeEach(async () => {
  await Promise.all([Blog.deleteMany({}), User.deleteMany({})])
  await api.post('/api/users').send({ name: '', username: 'felix', password: 'password', })
  const user = await User.findOne({ username: 'felix', })
  userId = user._id.toString()

  const blogIds = []
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: userId })
    let savedBlog = await blogObject.save()
    blogIds.push(savedBlog._id.toString())
  }
  user.blogs = blogIds
  await user.save()
  const creds = await api.post('/api/login').send({ username: 'felix', password: 'password', })
  loginInfo = creds.body
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

describe('posting a new blog', () => {
  test('is possible with POST', async () => {
    const newBlog = { user: userId, author: 'Michael', likes: 3, url: 'http://github.com/', title: 'Basketball' }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const content = response.body.filter(b => b.title === 'Basketball')[0]
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(content.author).toBe('Michael')
  })

  test('fail in the absence of a valid token', async () => {
    const blog = helper.initialBlogs[0]
    await api.post('/api/blogs').send(blog).expect(401)
    const badToken = loginInfo.token.substring(12)
    await api.post('/api/blogs').set('Authorization', `Bearer ${badToken}`).send(blog).expect(401)
  })

  test('without like field set default value to 0', async () => {
    const newBlog = { user: userId, author: 'Michael', url: 'http://github.com/', title: 'Basketball' }
    await api.post('/api/blogs').set('Authorization', `Bearer ${loginInfo.token}`).send(newBlog)
    const response = await api.get('/api/blogs')
    const content = response.body.filter(b => b.title === 'Basketball')[0]
    expect(content.likes).toBe(0)
  })

  test('only succeeds when title and url are present', async () => {
    const noTitle = { user: userId, author: 'Michael', url: 'http://github.com/' }
    await api.post('/api/blogs').set('Authorization', `Bearer ${loginInfo.token}`).send(noTitle).expect(400)
    const noURL = { author: 'Michael', title: 'Basketball' }
    await api.post('/api/blogs').set('Authorization', `Bearer ${loginInfo.token}`).send(noURL).expect(400)
  })
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

afterAll(() => {
  mongoose.connection.close()
})
