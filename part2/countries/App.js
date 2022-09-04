import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Weather = (props) => {
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.selected.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  } , [])

  if(weather.current) {
  return ( 
    <div>
      <h1>Weather in {props.selected.capital}</h1>
      <p>Temperature: {weather.current.temperature} Celsius</p>
      <img src = {weather.current.weather_icons[0]}></img>
      <p>Wind: {weather.current.wind_speed} m/s</p>
    </div>
  )
  } else {
    return (
      <p></p>
    )
  }

}

const ShowCountries = (props) => {
  if(props.filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (props.filtered.length === 1) {
    const selected = props.filtered[0]
    const languages = selected.languages
    return ( 
      <div>
        <h1>{selected.name}</h1>
        <p>Capital: {selected.capital}</p> 
        <p>Area: {selected.area}</p>
        <b>Languages:</b>
        <ul>
          {languages.map(lang => 
          <li key = {lang.iso639_1} >{lang.name}</li>)}
        </ul>
        <img src= {selected.flag} alt = "flag" width="128" height="128" ></img>
        <Weather selected = {selected} ></Weather>
      </div>
    )
  } else {
    
    return (
        <ul>
        {props.filtered.map(country =>
          <li key = {country.alpha2Code}>{country.name}<button onClick={() => props.handleClick(country.name)}> show </button></li> )}   
        </ul>
    )
      }

}

const Filter = (props) => {
  return (
    <div>
      find countries <input 
        value = {props.filter}
        onChange = {props.handleFilterChange}
      /> 
    </div>    
  )
}

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filtered = countries.filter(countries => countries.name.toLowerCase().includes(filter.toLowerCase()))

  const handleClick = (props) => {
    setFilter(props)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
    <Filter filter = {filter} handleFilterChange = {handleFilterChange} ></Filter>
    <ShowCountries filter = {filter} handleClick = {handleClick} filtered = {filtered}> </ShowCountries>
    </div>
  )
}

export default App
