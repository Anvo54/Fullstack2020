import React, { useState, useEffect } from 'react'
import '../style.css'
import personService from '../services/personService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')

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
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {setSuccessMessage(null)},5000)
      }).catch(error =>  {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {setErrorMessage(null)},5000)
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`))
        replaceNum(exists, newName)
    }
    setNewName('')
    setNewNumber('')
  }

  const replaceNum = (id, newName) =>{
    let notFound = false
    const updatedPerson = persons.find(p => p.id === id)
    const changePerson = {...updatedPerson, number: newNumber}
    personService.update(id, changePerson).catch(error =>{
      setErrorMessage(`Information of ${newName} has already been removed from server`)
      setPersons(persons.map(p => p.id !== id))
      setTimeout(() => {setErrorMessage(null)},5000)
      notFound = true
    })
    if (notFound === false){
      setPersons(persons.map(person => person.id !== id ? person : changePerson))
      setSuccessMessage(`${updatedPerson.name} updated`)
      setTimeout(() => {setSuccessMessage(null)},5000)
    }
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
    let notFound = false
    if (window.confirm(`Delete ${name}?`)){
      personService.del(id).catch(error => {
        setErrorMessage(`${name} has already been removed!`)
        setTimeout(() => {setErrorMessage(null)},5000)
        notFound = true
      })
      setPersons(persons.filter(n => n.id !== id))
      if (notFound !== false)
        setErrorMessage(`information of ${name} has been removed from server`)
      setTimeout(() => {setErrorMessage(null)},5000)
    }
  }

  const Notification = ({errorMessage, successMessage})=>{
    if (!errorMessage && !successMessage)
      return null
    if (successMessage){
        return (
          <div className="success">
            {successMessage}
          </div>

      )
    }
    if (errorMessage){
        return (
          <div className="error">
            {errorMessage}
          </div>
        )
    }
    return null
  }

const namesToShow = !filterName ? persons : persons.filter(person => person.name.match(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
        <FilterForm filterName={filterName} handleFilter={handleFilter}/>
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

const FilterForm =(props)=>{
  return(
    <div>
      filter shown with <input value={props.filterName} onChange={props.handleFilter}/>
    </div>
  )
}

const PersonsToShow = ({person, del}) =>{
  return(
    <table>
      <tbody>
        {person.map(person =>
        <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={()=>del(person.id, person.name)}>delete</button></td>
          </tr>)}
      </tbody>

    </table>
  )
}

export default App
