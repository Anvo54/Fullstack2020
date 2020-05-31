import React from 'react'
import { useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Button, Form, Alert } from 'react-bootstrap'


const LoginForm = () => {
  const dispatch = useDispatch()
  const loginForm = (event) => {
    event.preventDefault()

    const aUser = {
      username: event.target.Username.value,
      password: event.target.Password.value
    }
    dispatch(loginUser(aUser))
    event.target.Username.value = ''
    event.target.Password.value = ''
  }
  
  const messages = useSelector(state => state.message)
  return (
  <Form onSubmit={loginForm}>
    <Form.Group>
      <div>
        <h3>Login</h3>
        {messages.message !== '' && messages.message_type === 'ERROR' &&
        <Alert variant='danger'>{messages.message}</Alert>}
        <p>
          <Form.Label>
            Username
          </Form.Label>
        </p>
        <Form.Control
          name="Username"
        />
      </div>
      <div>
        <p>
          <Form.Label>
            Password
          </Form.Label>
        </p>
        <Form.Control
          name="Password"
          type="password"
        />
      </div>
      <Button id="login-button" type="submit">login</Button>
    </Form.Group>
  </Form>
)}

export default LoginForm