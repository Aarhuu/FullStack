import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './modules/coms'


const ShowPersons = (props) => {
  const filtered = props.filter === ''
  ? props.persons 
  : props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())) 
  return (
    <ul>
      {filtered.map(person =>
        <ShowSingle key = {person.id} id = {person.id} name = {person.name} number = {person.number} removePerson = {props.removePerson} > </ShowSingle>)}   
    </ul>
  )
}

const ShowSingle = (props) => {
  return (
    <li key = {props.id}>{props.name} {props.number} <button onClick = {() => props.removePerson(props.id)} >delete</button>  </li> 
  )
}

const AddNew = (props) => {
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={props.addPerson} >
        <div>
          name: <input 
            value = {props.newName}
            onChange = {props.handleNameChange}
          />
        </div>
        <div>
          number: <input
            value = {props.newNumber}
            onChange = {props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <input 
    value = {props.filter}
    onChange = {props.handleFilterChange}
    ></input>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  } else if (props.message.includes("already")) {
    return (
      <div className='error'>
        {props.message}
      </div>
    )
  }

  return (
    <div className='addition'>
    {props.message}
  </div>    
  )


}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name ===  personObject.name).includes(true)) {
      if(window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const id = persons.filter(person => person.name === newName)[0].id
        console.log(id)
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
      }
    }
  
  const removePerson = (event) => {
    const removable = persons.filter(person => person.id === event)
    if(window.confirm(`Delete ${removable[0].name}?`)) {
      personService
        .remove(event)
        .then(setPersons(persons.filter(person => person.id !== event)))
        .catch(error => {
          setMessage(
            `Information of ${removable.name} has already been deleted!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')      
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}></Notification>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} ></Filter>
      <AddNew addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}></AddNew>
      <h2>Numbers</h2>
      <ShowPersons persons = {persons} filter = {filter} removePerson = {removePerson} ></ShowPersons>
    </div> 
  )
}

export default App
