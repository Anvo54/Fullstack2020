export const addvote = (id) => {
  return {
    type: 'vote',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'new_anecdote',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'init_anecdotes',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'new_anecdote':
      return [...state, action.data]
    case 'init_anecdotes':
      return action.data
    case 'vote':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.sort((a,b) => b.votes - a.votes).map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    default:
      return state
  }
  }
export default reducer