import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState([0,0])
  const [points, setPoint] = useState([0, 0, 0, 0, 0, 0])

  const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max))
  }
  const handlePoints = () =>{
    const copy = {...points}
    copy[selected]+=1
    if (most[0] < copy[selected])
    {
      const mostcopy = {...most}
      mostcopy[0] = copy[selected]
      mostcopy[1] = selected
      setMost(mostcopy)
    }
    setPoint(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <button onClick={()=> setSelected(getRandomInt(anecdotes.length))}>Paina</button>
      <button onClick={handlePoints}>vote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[most[1]]}
      <p>has {most[0]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)