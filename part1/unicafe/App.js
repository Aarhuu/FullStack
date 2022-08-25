import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good*1 + bad*-1)/all
  const positive = good/all
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <tr>
      <StatisticLine type = "good" count = {good}></StatisticLine>
      </tr>
      <tr>
      <StatisticLine type = "neutral" count = {neutral}></StatisticLine>
      </tr>
      <tr>
      <StatisticLine type = "bad" count = {bad}></StatisticLine>
      </tr>
      <tr>
      <StatisticLine type = "all" count = {all}></StatisticLine>
      </tr>
      <tr>
      <StatisticLine type = "average" count = {average}></StatisticLine>
      </tr>
      <tr>
      <StatisticLine type = "positive" count = {positive}></StatisticLine>
      </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick = {() => props.handler(props.count + 1)}>{props.type}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <td>{props.type} {props.count}</td>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button type = "good" count = {good} handler = {setGood}></Button>
      <Button type = "neutral" count = {neutral} handler = {setNeutral}></Button>
      <Button type = "bad" count = {bad} handler = {setBad}></Button>
      <h1>Statistics</h1> 
      <Statistics good = {good} neutral = {neutral} bad = {bad} ></Statistics>
    </div>
  )
}

export default App

