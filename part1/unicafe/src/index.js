import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </>
  )
}
const Button = ({text, onClick}) => {
  return (
    <button onClick={() => onClick()}>{text}</button>
  )
}
const Feedback = ({adding}) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={() => adding("good")} />
      <Button text="neutral" onClick={() => adding("neutral")} />
      <Button text="bad" onClick={() => adding("bad")} />
    </>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addReviews = (name) => {
    if (name==="good") {return setGood(good+1)}
    if (name==="neutral") {return setNeutral(neutral+1)}
    if (name==="bad") {return setBad(bad+1)}
  }

  return (
    <>
      <Feedback adding={addReviews} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
