import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from '../reducers/messageReducer'

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: credentials.username, 
        password: credentials.password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (e) {
      let message = {
        action: 'SET_MESSAGE',
        message_type: 'ERROR',
        message: 'invalid username or password'
      }
      dispatch(setMessage(message, 5))
    }
  }
}

export const presistantLogin = user => {
    blogService.setToken(user.token)
    return {
      type: 'LOGGEDIN',
      data: user
    }
}

const userReducer = (state = null, action) => {
  console.log('action ',action)
  console.log('state ', state)
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGGEDIN':
      return action.data
    default:
      return state
  }
}

export default userReducer