const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token

  let decodedToken = { id: null }
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  catch (e) {
    logger.error(e)
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)
  blog.user = user._id
  const result = await blog.save()
  user.notes = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' })
  res.json(updatedBlog)
})

module.exports = blogsRouter
