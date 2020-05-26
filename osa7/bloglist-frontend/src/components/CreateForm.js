import React, { useState } from 'react'
import { newBlog } from '../reducers/blogreducer'

const BlogForm = ({ createBlog }) => {
  // const [author, setAuthor] = useState('')
  // const [title, setTitle] = useState('')
  // const [url, setUrl] = useState('')

  // const handleAuthorChange = (event) => {
  //   setAuthor(event.target.value)
  // }

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   setUrl(event.target.value)
  // }

  const addBlog = (event) => {
    event.preventDefault()
    newBlog({
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value
    })
    // setTitle('')
    // setUrl('')
    // setAuthor('')
    newBlog(newBlog)
  }
  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     author: author,
  //     title: title,
  //     url: url
  //   })
  //   setTitle('')
  //   setUrl('')
  //   setAuthor('')
  // }


  return (
    <form onSubmit={addBlog}>
      <div>
        <h3>create new</h3>
        title:
        <input
          name='title'
          // id='title'
          // type="text"
          // value={title}
        />
        <br></br>
        author:
        <input
          name='author'
          // id='author'
          // type="text"
          // value={author}
        />
        <br></br>
        url:
        <input
          name='url'
          // id='url'
          // type="text"
          // value={url}
        />
        <br></br>
        <button id='submit-button' type="submit">create</button>
      </div>
    </form>
  )

}

export default BlogForm