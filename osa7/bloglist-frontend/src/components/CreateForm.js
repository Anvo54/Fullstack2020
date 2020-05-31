import React from 'react'
import { newBlog } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import { Form, Button } from 'react-bootstrap'



const BlogForm = ({ hideAfter }) => {
  const dispatch = useDispatch()
  
  const addBlog = (event) => {
    event.preventDefault()

    const message = {
      action: 'SET_MESSAGE',
      message_type: 'SUCCESS',
      message: `a new blog ${event.target.title.value} by ${event.target.author.value} added`
    }
    
    const newBlogObject = ({
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value
    })
    hideAfter()
    dispatch(newBlog(newBlogObject))
    dispatch(setMessage(message, 5))

    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
  }

  return (
    <Form onSubmit={addBlog}>
      <div>
        <h3>create new</h3>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            name='title'/>
          <Form.Label>author:</Form.Label>
          <Form.Control
            name='author'/>
          <Form.Label>url:</Form.Label>
          <Form.Control
            name='url'/>
            <br></br>
          <Button variant='primary' id='submit-button' type="submit">create</Button>
        </Form.Group>
      </div>
    </Form>
  )

}

export default BlogForm