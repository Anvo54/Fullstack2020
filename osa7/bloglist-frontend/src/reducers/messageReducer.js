let timeoutID

const initState = {
  message: '',
  message_type: null
}

export const setMessage = (data, millisec) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message_type: data.message_type,
      message: data.message
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch({
      type: 'SET_MESSAGE',
      message_type: null,
      message: ''
    }), millisec * 1000);
  }
}

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      state = {
        message: action.message,
        message_type: action.message_type
      }
      return state
    default:
      return state
  }
}

export default messageReducer