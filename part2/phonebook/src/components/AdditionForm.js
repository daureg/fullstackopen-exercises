import React from 'react'

const AdditionForm = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) =>
      <form onSubmit={addName}>
        <label>name: <input onChange={handleNameChange} type="text" value={newName} /> </label>
        <label>number: <input onChange={handleNumberChange} type="tel" value={newNumber} /> </label>
          <button type="submit">add</button>
      </form>

export default AdditionForm

