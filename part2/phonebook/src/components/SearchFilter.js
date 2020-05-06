import React from 'react'

const SearchFilter = ({changeHandler, maintainedState}) => {
  return (
    <p>
      <label>Only show names containing <input onChange={changeHandler} value={maintainedState} />
      </label>
    </p>
  )
}

export default SearchFilter
