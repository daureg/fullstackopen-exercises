import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryCard = ({country, countries, setSearch}) => {
  if (country.length === 0) {return null}
  const matches = countries.filter(c => c.name.toLowerCase().includes(country.toLowerCase()))
  if (matches.length >= 10) {return <p>Too many matching countries, keep typing</p>}
  if (1 < matches.length) {
    return (
      <ul>
      {matches.map(c => {
        return <li key={c.name}>{c.name}<button onClick={() => setSearch(c.name)}>show</button></li>
      })}
      </ul>
    )
  }
  const c = matches[0]
  const alt_flag = `Flag of ${c.name}`
  return (
    <div>
      <h3>{c.name}</h3>
      <p>Capital: {c.capital}</p>
      <p>Population: {new Intl.NumberFormat().format(c.population)}</p>
      <h4>Languages</h4>
      <ul>{c.languages.map(s => <li key={s.name}>{s.name}</li>)}</ul>
      <img src={c.flag} alt={alt_flag} width="200" />
    </div>
  )
}
const App = () => {
  const [country, setCountry] = useState('') 
  const [countries, setCountries ] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <>
      <label>Search for a country: <input autofocus="true" value={country} onChange={handleCountryChange} /></label>
      <CountryCard country={country} countries={countries} setSearch={setCountry}/>
    </>
  )
}

export default App 
