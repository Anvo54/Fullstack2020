import React, {useEffect} from 'react'
import { likeBlog } from '../reducers/blogreducer'
import { useDispatch, useSelector } from 'react-redux'
import { initComments } from '../reducers/commentsReducer'

const SingleBlog = ({blog, useParams}) => {
  console.log(blog)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  const id = useParams().id
  const sBlog = blog.find(b => b.id === id)
  const blogsComments = comments.filter(c => c.blog === id)
  
  useEffect(() => {
    dispatch(initComments(id))
  }, [dispatch, id])

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
      <a href={`${sBlog.url}`}>{sBlog.url}</a><br></br>
      <div>{sBlog.likes} likes<button onClick={() => handleLikes()}>like</button></div>
      <div>added by {sBlog.author}</div>
      <br></br>
      <h3>comments</h3>
      {blogsComments.map(c => <li key={c.id}>{c.comment}</li>)}
    </div>
  )
}

export default SingleBlog