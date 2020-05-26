import React from 'react'
import { newBlog } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const BlogForm = ({ createBlog }) => {
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
    createBlog(newBlogObject)
    dispatch(newBlog(newBlogObject))
    dispatch(setMessage(message, 5))
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h3>create new</h3>
        title:
        <input
          name='title'/>
        <br></br>
        author:
        <input
          name='author'/>
        <br></br>
        url:
        <input
          name='url'/>
        <br></br>
        <button id='submit-button' type="submit">create</button>
      </div>
    </form>
  )

}

export default BlogForm