import React from 'react'

const Course=({course})=>{
	console.log('Course: ',course)
	return(
	  <div>
		<Header course={course.name}/>
		<Parts parts={course.parts}/>
		<Total parts={course.parts}/>
	  </div>
	)
  }
  
  const Header=(props)=> <h1>{props.course}</h1>
  
  const Parts =({parts}) =>{
	return(
	  <div>
		<ul>
		  {parts.map(part => <Part key={part.id} part={part}/>)}
		</ul>
	  </div>
	)
  }
  
  const Part = ({part}) =>{
	return(
	  <div>{part.name} {part.exercises}</div>
	)
  }
  
  const Total =({parts})=>{
	const total = parts.reduce((s,p) => {
	  return s+p.exercises
	},0)
	return(
	  <div>
		<b>total of {total} exercises</b>
	  </div>
	)
  }

export default Course