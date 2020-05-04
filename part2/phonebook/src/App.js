import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name.toLowerCase() === newName.toLowerCase())) {
      return alert(`${newName} is already in the phonebook`)
    }
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addName}>
        <label>
          name: <input onChange={handleNameChange} type="text" value={newName} />
        </label>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
    <ul>
      {persons.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
    </div>
  )
}

export default App
