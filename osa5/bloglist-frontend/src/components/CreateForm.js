import React, {useState} from 'react'

const createBlog = ({
  handleBlogAdd,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  successMessage,
  author,
  title,
  url
}) => (
  <form onSubmit={handleBlogAdd}>
    {successMessage !== null && <div className="successMessage">{successMessage}</div>}
    <div>
      <h3>create new</h3>
       title: 
       <input
           type="text"
           onChange={handleTitleChange}
           value={title}
         />
       <br></br>
       author:
         <input
           type="text"
           onChange={handleAuthorChange}
           value={author}
         />
       <br></br>
       url:
         <input
           type="text"
           onChange={handleUrlChange}
           value={url}
         />
         <br></br>
       <button type="submit">create</button>
    </div>
    </form>
)

export default createBlog