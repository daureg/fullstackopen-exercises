import React from 'react'
import Person from './Person'

const Persons = ({persons, removePerson}) => {
      return (<ul>
      {persons.map(p => <Person removePerson={removePerson} key={p.name} person={p} />)}
      </ul>)
}

export default Persons
