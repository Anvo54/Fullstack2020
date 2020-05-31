import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateForm'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Messages from './components/Messages'
import { initBlogs } from './reducers/blogreducer'
import { initUsers } from './reducers/allUsersReducer'
import { presistantLogin } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
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

  const handleLogout = async => {
    window.localStorage.clear()
  }
  
  const BlogContent = () => {
    return (
      <div>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm hideAfter={()=> blogFormRef.current.toggleVisibility()}/>
      </Togglable>
      <br></br>
        {blog.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} Link={Link}/>
      )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div className='container'>
        <LoginForm />
      </div>)
  } else
    return (
      <div className='container'>
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#' as='span'>
                  <Link style={padding} to={'/'}>home</Link>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                  <Link style={padding} to={'/users'}>users</Link>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                  <Form onSubmit={handleLogout}>
                    {user.name} logged in <Button variant='light' type="submit" size='sm'>logout</Button>  
                  </Form>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <h2>blog app</h2>
          <Messages/>
          <Switch>
            <Route path='/users/:id'>
              <User allUsers={allUsers} useParams={useParams} />
            </Route>
            <Route path='/blogs/:id'>
              <SingleBlog useParams={useParams} blog={blog}/>
            </Route>
            <Route path='/users'>
              <Users Link={Link} />
            </Route>
            <Route path='/'>
              <BlogContent/>
            </Route>
          </Switch>
        </Router>
        </div>
    )
}

export default App