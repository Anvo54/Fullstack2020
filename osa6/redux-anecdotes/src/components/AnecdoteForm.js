import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationChange({
      type: 'ADD_ANECDOTE',
      content
    }))
    setTimeout(()=> {
      dispatch(notificationChange({
        type: 'HIDE'
      }))
    },5000)
  }

  return (
    <form onSubmit={addAnecdote}>
    <div><input name="anecdote" /></div>
    <button>create</button>
  </form>
  )
}


export default AnecdoteForm