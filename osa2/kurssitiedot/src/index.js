import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course=({course})=>{
  return(
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header =(props)=>{
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (course) =>{
  return(
    <div>
      <ul>
        {course.parts.map((course, id) =>
          <Part key={id} course={course} />
        )}
      </ul>
    </div>
  )
}

const Part = ({course, id}) =>{
  return(
  <li key={id}>{course.name} {course.exercises}</li>
  )
}

const Total =({parts})=>{
  const total = parts.reduce( (s, p) => {
    return  s+p.exercises
  },0)
  return(
    <div>
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
