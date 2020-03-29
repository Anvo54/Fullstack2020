import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	let all = good + neutral + (bad)
	const handleGood = () =>{
		setGood(good+1)
	}

	const handleBad = () =>{
		setBad(bad+1)
	}

	const handleNeutral = () =>{
		setNeutral(neutral+1)
	}

	return (
		<div>
			<Header text="give feedback"/>
			<br></br>
			<Button handleClick={handleGood} text="Good"/>
			<Button handleClick={handleNeutral} text="Neutral"/>
			<Button handleClick={handleBad} text="Bad"/>
			<br></br>
			<Statistics good={good} bad={bad} neutral={neutral} all={all}/>
		</div>
	)
}

const Statistics = ({good, neutral, bad, all}) =>{
	if (all)
		return(
			<div>
				<h2>statistics</h2>
				<table>
					<tbody>
						<tr>
							<td>good</td>
							<td>{good}</td>
						</tr>
						<tr>
							<td>neutral</td>
							<td>{neutral}</td>
						</tr>
						<tr>
							<td>bad</td>
							<td>{bad}</td>
						</tr>
						<tr>
							<td>all</td>
							<td>{all}</td>
						</tr>
						<tr>
							<td>average</td>
							<td>{(good + (bad*-1))+ neutral / all}</td>
						</tr>
						<tr>
							<td>positive</td>
							<td>{(good / all)*100} %</td>
						</tr>
					</tbody>
				</table>
			</div>
	)
	return(
		<div>
			<p>No feedback given</p>
		</div>
	)
}

const Button =(props)=>{
	return(
		<button onClick={props.handleClick}>{props.text}</button>
	)
}

const Header =({text})=><h1>{text}</h1>

ReactDOM.render(<App />, 
	document.getElementById('root')
)