import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifKind, setNotifKind] = useState('error')
  const showSuccess = (msg) => {
        setNotifKind("success")
        setNotifMessage(msg)
        setTimeout(() => {setNotifMessage(null)}, 2000)
  }
  const showError = (msg) => {
        setNotifKind("error")
        setNotifMessage(msg)
        setTimeout(() => {setNotifMessage(null)}, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      setUser(user)
      setUsername('')
      setPassword('')
      showSuccess(`logged in as ${user.username}`)
    } catch (exception) {
      showError('Wrong credentials')
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Please login</h2>
        <Notification message={notifMessage} kind={notifKind} />
        <form onSubmit={handleLogin}>
          <p><label>username:
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </label></p>
          <p><label>password: 
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </label></p>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Notification message={notifMessage} kind={notifKind} />
      <p>{user.name} logged in</p>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
