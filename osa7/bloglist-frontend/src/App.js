import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateForm'
import { initBlogs } from './reducers/blogreducer'
import { presistantLogin } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.message)
  const blog = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(presistantLogin(user))
    }
  }, [dispatch])

  const handleLogout = async () => {
    window.localStorage.clear()
  }

  const handleBlogAdd = () => {
    blogFormRef.current.toggleVisibility()
  }

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
        <LoginForm />
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