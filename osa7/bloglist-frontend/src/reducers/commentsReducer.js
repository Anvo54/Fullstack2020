import commentService from '../services/comments'

export const initComments = () => {
  return async dispatch => {
    const comments = await commentService.getComment()
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const postComment = (content) => {
  return async dispatch => {
    const comment = await commentService.postComment(content)
    console.log(comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: comment
    })
  }
}

const commentReducer = (state = [], action) =>{
  switch (action.type) {
    case 'GET_COMMENTS':
      return action.data
    case 'NEW_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export default commentReducer