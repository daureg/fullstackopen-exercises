import React, { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'
import AdditionForm from './components/AdditionForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch((error) => { console.debug(error); showError(`Can't load the phonebook`)})
  }, [])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifKind, setNotifKind] = useState('error')

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearchChange = (event) => { setSearch(event.target.value) }

  const showSuccess = (msg) => {
        setNotifKind("success")
        setNotifMessage(msg)
        setTimeout(() => {setNotifMessage(null)}, 2000)
  }
  const showError = (msg) => {
        setNotifKind("error")
        setNotifMessage(msg)
        setTimeout(() => {setNotifMessage(null)}, 3000)
  }

  const addName = (event) => {
    event.preventDefault()
    const matches = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())
    if (matches.length === 1) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number?`)) {
        const p = matches[0]
        const newPerson = {...p, number: newNumber}
        personService
          .update(p.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            showSuccess(`changed number of ${returnedPerson.name}`)
          })
          .catch((error) => { console.debug(error.response); showError(`Can't update number of ${newPerson.name}: ${error.response.data.error}`) })
      }
    }
    else {
      personService
        .create({name: newName, number: newNumber})
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          showSuccess(`successfully added ${createdPerson.name} to the list`)
          setTimeout(() => {setNotifMessage(null)}, 2000)
          setNewName('')
          setNewNumber('')
          setSearch('')
        })
        .catch((error) => { console.debug(error.response); showError(`Can't create ${newName}: ${error.response.data.error}`) })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Are you sure you want to remove ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => { setPersons(persons.filter(p => p.id !== person.id)) })
      .catch((error) => { console.debug(error.response); showError(`Can't remove ${person.name}: ${error.response.data.error}`)})
    }
  }

  const personsToShow = (search.length > 0) ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} kind={notifKind} />
      <SearchFilter changeHandler={handleSearchChange} maintainedState={search} />
      <AdditionForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
