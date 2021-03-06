import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        <h3>create new</h3>
        title:
        <input
          id='title'
          type="text"
          onChange={handleTitleChange}
          value={title}
        />
        <br></br>
        author:
        <input
          id='author'
          type="text"
          onChange={handleAuthorChange}
          value={author}
        />
        <br></br>
        url:
        <input
          id='url'
          type="text"
          onChange={handleUrlChange}
          value={url}
        />
        <br></br>
        <button id='submit-button' type="submit">create</button>
      </div>
    </form>
  )

}

export default BlogForm