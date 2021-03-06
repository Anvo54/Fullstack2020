import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header = {course.name}/>
      <Content part = {course.parts} />
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (props) =>{
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part part ={props.part[0].name} exercise={props.part[0].exercise}/>
      <Part part ={props.part[1].name} exercise={props.part[1].exercise}/>
      <Part part ={props.part[2].name} exercise={props.part[2].exercise}/>
    </div>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) =>{
  console.log(props)
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
