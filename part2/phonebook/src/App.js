import React, { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'
import AdditionForm from './components/AdditionForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearchChange = (event) => { setSearch(event.target.value) }
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name.toLowerCase() === newName.toLowerCase())) {
      return alert(`${newName} is already in the phonebook`)
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setSearch('')
  }

  const personsToShow = (search.length > 0) ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter changeHandler={handleSearchChange} maintainedState={search} />
      <AdditionForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
