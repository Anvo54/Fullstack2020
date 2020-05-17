import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`new anecdote ${content}`, 10)
  }

  return (
    <form onSubmit={addAnecdote}>
    <div><input name="anecdote" /></div>
    <button>create</button>
  </form>
  )
}



export default connect(
  null,
  {createAnecdote, notificationChange}
)(AnecdoteForm)