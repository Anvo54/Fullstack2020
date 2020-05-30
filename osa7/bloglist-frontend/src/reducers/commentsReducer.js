import commentService from '../services/comments'

export const initComments = () => {
  return async dispatch => {
    const comments = await commentService.getBlog()
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

const commentReducer = (state = [], action) =>{
  switch (action.type) {
    case 'GET_COMMENTS':
      return action.data
    default:
      return state
  }
}

export default commentReducer