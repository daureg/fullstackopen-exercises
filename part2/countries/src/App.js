import React, { useState, useEffect } from 'react'
import {isEmpty} from "lodash"
import axios from 'axios'

const endpoint = "https://api.openweathermap.org/data/2.5/weather"
const api_key = process.env.REACT_APP_WEATHER_KEY

const CountryCard = ({country, countries, setSearch, setWeather}) => {
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
      <Weather c={c} />
    </div>
  )
}
const Weather = ({c}) => {

  const [weather, setWeather ] = useState({})
  const query = `${endpoint}?q=${c.capital},${c.name}&appid=${api_key}&units=metric`

  useEffect(() => {
    axios
      .get(query)
      .then((response) => {setWeather(response.data)})
  }, [query, c.capital])
  if (isEmpty(weather)) {return null}
  const desc = weather.weather[0].description
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  const temp = weather.main.temp
  const speed = weather.wind.speed
  return (
    <div>
      <h3>Weather in {c.capital}</h3>
      <p>Temperature: {temp}°C</p>
      <p><img style={{verticalAlign: 'middle'}} src={icon} alt={desc} width={50} height={50} />{desc}</p>
      <p>Wind: {speed} m/s</p>
    </div>
  )
}
const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries ] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <>
      <label>Search for a country: <input autoFocus={true} value={country} onChange={handleCountryChange} /></label>
      <CountryCard country={country} countries={countries} setSearch={setCountry}/>
    </>
  )
}

export default App
