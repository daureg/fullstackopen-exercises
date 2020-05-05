import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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
  }

  const personsToShow = (search.length > 0) ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <p><label>Only show names containing <input  onChange={handleSearchChange} type="text" value={search} /></label></p>
      <form onSubmit={addName}>
        <label>name: <input onChange={handleNameChange} type="text" value={newName} /> </label>
        <label>number: <input onChange={handleNumberChange} type="tel" value={newNumber} /> </label>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
    <ul>
      {personsToShow.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
    </ul>
    </div>
  )
}

export default App
