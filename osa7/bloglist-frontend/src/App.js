import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateForm'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogreducer'
import loginService from './services/login'
import { setMessage } from './reducers/messageReducer'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.message)
  const blog = useSelector(state => state.blog)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async () => {
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      let message = {
        action: 'SET_MESSAGE',
        message_type: 'ERROR',
        message: 'invalid username or password'
      }
      dispatch(setMessage(message,5))
    }
  }

  const handleBlogAdd = () => {
    blogFormRef.current.toggleVisibility()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Login</h3>
        {messages.message !== '' && messages.message_type === 'ERROR' && <div className="errorMessage">{messages.message}</div>}
        <p>
          <strong>
            Username
          </strong>
        </p>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p>
          <strong>
          Password
          </strong>
        </p>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogContent = () => (
    <div>
      {blog.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>)
  } else
    return (
      <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>
          <p>
            {user.name} logged in <button type="submit">logout</button>
          </p>
        </form>
        {messages.message !== '' && messages.message_type === 'SUCCESS' && <div className="successMessage">{messages.message}</div>}
        {messages.message !== '' && messages.message_type === 'ERROR' && <div className="errorMessage">{messages.message}</div>}
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm createBlog={handleBlogAdd}
          />
        </Togglable>
        {blogContent()}
      </div>
    )
}

export default App