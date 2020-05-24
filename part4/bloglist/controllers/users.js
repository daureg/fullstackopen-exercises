const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.patch('/:id', async (request, response) => {
  const u = await User.findById(request.params.id)
  u.blogs = request.body.blogs
  await u.save()
  response.status(204).end()
})
usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    response.status(400).send({ error: 'password should be longer than 3 characters' })
  }
  const saltRounds = 11
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.json(savedUser)
})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

module.exports = usersRouter
