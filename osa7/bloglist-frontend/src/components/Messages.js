import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Messages = () => {
  const messages = useSelector(state => state.message)
  return (
    <div className='container'>
      {messages.message !== '' && messages.message_type === 'SUCCESS' && 
      <Alert variant='success'>{messages.message}</Alert>}
      {messages.message !== '' && messages.message_type === 'ERROR' && <Alert variant='warning'>{messages.message}</Alert>}
    </div>
  )
}

export default Messages