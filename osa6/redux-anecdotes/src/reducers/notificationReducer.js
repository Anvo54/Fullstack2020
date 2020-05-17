const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutID

export const notificationChange = (notification, sec) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      notification: ''
    }), sec * 1000)
  }
}

export default notificationReducer