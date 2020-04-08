import React, { useState, useEffect } from 'react'
import personService from '../services/personService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('') 

useEffect(()=> {
  personService.getAll()
  .then(initialPersons => {setPersons(initialPersons)})
}, [])

  const addName = (event) =>{
    let exists;
    persons.forEach(person => {
      exists = (person.name === newName) ? person.id : 0;
    });
    event.preventDefault()
    if (!exists) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`))
        replaceNum(exists, newNumber)
    }
    setNewName('')
    setNewNumber('')
  }

  const replaceNum = (id, number) =>{
    const updatedPerson = persons.find(p => p.id === id)
    const changePerson = {...updatedPerson, number: newNumber}
    setPersons(persons.map(pers => pers.id === id ? changePerson : pers))
  }

  const handleNameChange = (event)=>{
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilter =(event)=>{
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const deletePerson = (id, name) =>{
    if  (window.confirm(`Delete ${name}?`)){
      personService.del(id)
      setPersons(persons.filter(n => n.id !== id))
    }
  }

const namesToShow = !filterName ? persons : persons.filter(person => person.name.match(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
        <FilteForm filterName={filterName} handleFilter={handleFilter}/>
      <h2>Add new</h2>
        <NameForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <PersonsToShow person={namesToShow} del={deletePerson}/>
    </div>
  )
}

const NameForm = (props)=>{
  return(
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
          <br></br>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const FilteForm =(props)=>{
  return(
    <div>
      filter shown with <input value={props.filterName} onChange={props.handleFilter}/>
    </div>
  )
}

const PersonsToShow = ({person, del}) =>{
  return(
    person.map(person => <div key={person.id}>{person.name} {person.number} 
    <button onClick={()=>del(person.id, person.name)}>delete</button></div>)
  )
}

export default App