import React from 'react'
import { useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

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
  <form onSubmit={loginForm}>
    <div>
      <h3>Login</h3>
      {messages.message !== '' && messages.message_type === 'ERROR' && <div className="errorMessage">{messages.message}</div>}
      <p>
        <strong>
          Username
        </strong>
      </p>
      <input
        name="Username"
      />
    </div>
    <div>
      <p>
        <strong>
        Password
        </strong>
      </p>
      <input
        name="Password"
        type="password"
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
)}

export default LoginForm