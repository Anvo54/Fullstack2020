import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import blogreducer from './reducers/blogreducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  message: messageReducer,
  blog: blogreducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store