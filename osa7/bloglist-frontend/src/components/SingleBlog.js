import React from 'react'
import { likeBlog } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'

const SingleBlog = ({blog, useParams}) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const sBlog = blog.find(b => b.id === id)
  if (!sBlog) {
    return null
  }
  let likes = sBlog.likes
  const handleLikes = () => {
    let updatedLikes = likes + 1
    const updatedBlog = {...sBlog, likes: updatedLikes}
    dispatch(likeBlog(updatedBlog))
  }

  return (
    <div>
      <h1>{sBlog.title}</h1>
      <a href={`http://${sBlog.url}`}>{sBlog.url}</a><br></br>
      <div>{sBlog.likes} likes<button onClick={() => handleLikes()}>like</button></div>
      <div>added by {sBlog.author}</div>
    </div>
  )
}

export default SingleBlog