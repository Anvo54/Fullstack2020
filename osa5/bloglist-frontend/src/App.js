import React, { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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

  const handleLogin = async (event) =>{
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
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`a new blog ${newBlogObject.title} by ${newBlogObject.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(()=> {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
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
        type="password"
        value={password}
        name="Password"
        onChange={({ target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

 const blogContent = () => (
    <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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
      <Togglable buttonLabel='New Blog'>
        <CreateBlog
          handleBlogAdd={handleBlogAdd}
          handleTitleChange={({ target }) => setTitle(target.value)} 
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          successMessage={successMessage}
          author={author}
          title={title}
          url={url}
        />
      </Togglable>
      {blogContent()}
    </div>
  )
}

export default App