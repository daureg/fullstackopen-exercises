import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const _ = require('lodash');

const Anecdote = ({anecdote, votes}) => [
      <p>{anecdote}</p>,
      <p>has {votes} votes</p>
]
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

  const voteForCurrent = () => {
    const currentVotes = [...points]
    currentVotes[selected] += 1
    setPoints(currentVotes)
  }
  const maxVoteIndex = points.indexOf(_.max(points))
  return (
    <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]} />
    <p>
      <button onClick={() => voteForCurrent()}>Vote</button>
      <button onClick={() => setSelected(_.random(props.anecdotes.length-1))}>Next anecdote</button>
    </p>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={props.anecdotes[maxVoteIndex]} votes={points[maxVoteIndex]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
