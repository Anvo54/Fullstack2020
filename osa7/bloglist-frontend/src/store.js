import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import blogreducer from './reducers/blogreducer'

const reducer = combineReducers({
  message: messageReducer,
  blog: blogreducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store