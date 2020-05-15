const notificationReducer = (state = 'NONE', action) => {
  console.log('Action in n: ', action, 'State in n:', state)
  switch(action.type) {
    case 'vote':
      return action.notif
    case 'new_anecdote':
      return action.notif
    default:
      return state
  }
}

export const notificationChange = notif => {
  return {
    type: 'vote',
    notif
  }
}

export default notificationReducer