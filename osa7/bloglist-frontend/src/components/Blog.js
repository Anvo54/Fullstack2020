import React, { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  let likes = blog.likes

  const [visible, setVisible] = useState(false)

  const handleLikes = () => {
    let updatedLikes = likes + 1
    const updatedBlog = {...blog, likes: updatedLikes}
    dispatch(likeBlog(updatedBlog))
  }

  const handleDelete = () => {
    let nameOfDeleted = blog.title
    dispatch(deleteBlog(blog.id))
    let message = {
      action: 'SET_MESSAGE',
      message_type: 'SUCCESS',
      message: `Blog ${nameOfDeleted} has been removed!`
    }
    dispatch(setMessage(message, 5))
  }

  const deleteButton = () =>{
    if (user.name === blog.user.name) 
      return (<button id="delete-button" onClick={() => handleDelete()}>delete</button>)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blogContent">
        {blog.title} {blog.author} <button id="View" onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible} className="togglableBlogContent">
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>Hide</button><br></br>
        <br></br>
        {blog.url}
        <br></br>
        likes <span className="likes">{likes} </span><button onClick={handleLikes}>like</button>
        <br></br>
        {user.name}
        <br></br>
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
