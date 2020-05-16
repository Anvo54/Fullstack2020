import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addvote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from '../components/Filter'



const AnecdoteList = () => {
  const anecdotes = useSelector(state => { 
    if (state.filter === '') {
      return state.anecdote
    } 
    else {
      return state.anecdote.filter(anec => anec.content.match(state.filter))
    }
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addvote(id))
    dispatch(notificationChange(`you voted ${content}`, 10))
  }

  return(
    <div>
    <h2>Anecdotes</h2>
    <Filter />
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    <h2>create new</h2>
  </div>
  )
}

export default AnecdoteList