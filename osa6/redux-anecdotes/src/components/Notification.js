import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    if (state.notification.type === 'SET_VOTE') {
      return `you voted '${state.notification.content}'`
    } else if (state.notification.type === 'ADD_ANECDOTE') {
      return `you added '${state.notification.content}'`
    } else  if (state.notification.type === 'HIDE'){
      return ''
    }
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification