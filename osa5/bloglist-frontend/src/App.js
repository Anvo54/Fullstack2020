import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogAdd = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.sort().concat(returnedBlog))
      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = async (blogObject) => {
    const updatedBlog = {
      user : blogObject.userid,
      likes: blogObject.likes,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    }
    try {
      await blogService.update(blogObject.id, updatedBlog)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.name}`)){
      try {
        await blogService.del(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setSuccessMessage(`Blog ${blog.name} has been removed!`)
        setTimeout(() => {
          setSuccessMessage(null)
        },5000)
      } catch (exception) {
        setErrorMessage(exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Login</h3>
        {errorMessage !== null && <div className="errorMessage">{errorMessage}</div>}
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
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={handleBlogUpdate} deleteBlog={handleBlogDelete} user={user}/>
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
        {successMessage !== null && <div className="successMessage">{successMessage}</div>}
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm createBlog={handleBlogAdd}
          />
        </Togglable>
        {blogContent()}
      </div>
    )
}

export default App