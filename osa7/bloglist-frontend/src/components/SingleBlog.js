import React, {useEffect} from 'react'
import { likeBlog } from '../reducers/blogreducer'
import { useDispatch, useSelector } from 'react-redux'
import { initComments, postComment } from '../reducers/commentsReducer'
import { Button, Form, ListGroup} from 'react-bootstrap'

const SingleBlog = ({blog, useParams}) => {
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  const id = useParams().id
  const sBlog = blog.find(b => b.id === id)
  const blogsComments = comments.filter(c => c.blog === id)
  
  const addComment =(event)=> {
    event.preventDefault()
    const commentObject = {
      comment: event.target.newComment.value,
      blog: id
    }
    dispatch(postComment(commentObject))
    event.target.newComment.value = ''
  }
  
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
      <div>{sBlog.likes} likes<Button size='sm' onClick={() => handleLikes()}>like</Button></div>
      <div>added by {sBlog.author}</div>
      <br></br>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control name='newComment'/>
          <br></br>
          <Button type='submit'>Add comment</Button>
        </Form.Group>
      </Form>
      <br></br>
  {blogsComments.map(c =>
    <ListGroup key={c.id}>
      <ListGroup.Item>{c.comment}</ListGroup.Item>
    </ListGroup>)}
    </div>
  )
}

export default SingleBlog