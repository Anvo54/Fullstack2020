import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import blogreducer from './reducers/blogreducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  message: messageReducer,
  blog: blogreducer,
  user: userReducer,
  allUsers: allUsersReducer,
  comments: commentsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store