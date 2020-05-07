import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLikes = () => {

    updateBlog({
      userid: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      name: blog.user.name,
      id: blog.id
    })
    setLikes(likes + 1)
  }

  const handleDelete = () => {
    deleteBlog({ id: blog.id, name: blog.title })
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blogContent">
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible} className="togglableBlogContent">
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>Hide</button><br></br>
        <br></br>
        {blog.url}
        <br></br>
        likes {likes} <button onClick={() => handleLikes()}>like</button>
        <br></br>
        {blog.user.name}
        <br></br>
        <button onClick={() => handleDelete()}>delete</button>
      </div>
    </div>
  )
}

export default Blog
