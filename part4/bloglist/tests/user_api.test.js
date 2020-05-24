const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('adding a new user', () => {
  test('fails when username already exists', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: usersAtStart[0].username, name: '', password: 'longenough' }
    await api.post('/api/users/').send(newUser).expect(400)
  })
  test('fails when username or password is too short', async () => {
    const shortUsername = { username: 'sc', name: '', password: 'longenough' }
    await api.post('/api/users/').send(shortUsername).expect(400)
    const shortPassword = { username: 'longenough', name: '', password: 'sp' }
    await api.post('/api/users/').send(shortPassword).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
