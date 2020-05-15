import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addvote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addvote(id))
    dispatch(notificationChange({
      type: 'SET_VOTE',
      id, 
      content
    }))
    setTimeout(()=> {dispatch(notificationChange({
      type: 'HIDE'
    }))},5000)
  }

  return(
    <div>
    <h2>Anecdotes</h2>
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