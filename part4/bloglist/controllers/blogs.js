const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const userIdFromToken = (token) => {
  let decodedToken = { id: null }
  try { decodedToken = jwt.verify(token, process.env.SECRET) }
  catch (e) { logger.error(e) }
  return decodedToken.id
}
blogsRouter.post('/', async (request, response) => {
  const decodedId = userIdFromToken(request.token)
  if (!decodedId) { return response.status(401).json({ error: 'token missing or invalid' }) }
  const user = await User.findById(decodedId)
  const blog = new Blog(request.body)
  blog.user = user._id
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedId = userIdFromToken(request.token)
  if (!decodedId) { return response.status(401).json({ error: 'token missing or invalid' }) }
  const res = await Promise.all([
    Blog.findById(request.params.id),
    User.findById(decodedId).populate('blogs', { id: 1 })
  ])
  if (!res[0]) {response.status(400).json({ error: `no blog with id ${request.params.id}` })}
  const blogToDelete = res[0].toJSON()
  blogToDelete.user = blogToDelete.user.toString()
  const userRequestingDeletion = res[1].toJSON()
  if (blogToDelete.user !== userRequestingDeletion.id) {response.status(401).json({ error: 'You\'re not allowed to delete this blog' })}
  userRequestingDeletion.blogs = userRequestingDeletion.blogs.filter(b => b.id !== blogToDelete.id)
  await Promise.all([userRequestingDeletion.save(), Blog.findByIdAndRemove(blogToDelete.id)])
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
