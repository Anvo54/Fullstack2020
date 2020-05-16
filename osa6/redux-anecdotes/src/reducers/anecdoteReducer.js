import anecdoteService from '../services/anecdotes'

export const addvote = id => {
  return async dispatch => {
    const votetest = await anecdoteService.vote(id)
    dispatch({
    type: 'vote',
    data: votetest
    }) 
  }
}
// export const addvote = (id) => {
//   return {
//     type: 'vote',
//     data: {
//       id: id
//     }
//   }
// }

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'new_anecdote',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'init_anecdotes',
      data: anecdotes
    })
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
      return state.sort((a,b) => b.votes - a.votes).map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    default:
      return state
  }
  }
export default reducer