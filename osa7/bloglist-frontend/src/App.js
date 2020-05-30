import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateForm'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import { initBlogs } from './reducers/blogreducer'
import { initUsers } from './reducers/allUsersReducer'
import { presistantLogin } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.message)
  const blog = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.allUsers)
  const blogFormRef = React.createRef()

  const padding = {
    padding: 5
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
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

  const BlogContent = () => {
    return (
      <div>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={handleBlogAdd}
        />
      </Togglable>
      {blog.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} Link={Link}/>
      )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>)
  } else
    return (
      <Router>
        <div>
          <div className='navMenu'>
            <Link style={padding} to={'/'}>home</Link>
            <Link style={padding} to={'/users'}>users</Link>
            <form className='inLine' onSubmit={handleLogout}>
              {user.name} logged in <button type="submit">logout</button>  
            </form>
          </div>
          <h2>blog app</h2>

          {messages.message !== '' && messages.message_type === 'SUCCESS' && <div className="successMessage">{messages.message}</div>}
          {messages.message !== '' && messages.message_type === 'ERROR' && <div className="errorMessage">{messages.message}</div>}
          <Switch>
            <Route path='/users/:id'>
              <User allUsers={allUsers} useParams={useParams} />
            </Route>
            <Route path='/blogs/:id'>
              <SingleBlog useParams={useParams} blog={blog}/>
            </Route>
            <Route path='/users'>
              <Users allUsers={allUsers} Link={Link} />
            </Route>
            <Route path='/'>
              <BlogContent/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default App