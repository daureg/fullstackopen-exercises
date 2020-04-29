import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
  return ( <>
    <h1>{course.title}</h1>
    </>)
}
const Total = (exo) => {
  return ( <>
    <p>Number of exercises {exo.total}</p>
    </>)
}

const Part = (part) => {
  return ( <>
    <p>{part.name} {part.num_exercises}</p>
    </>)
}
const Content = (info) => {
  return (
    <>
    <Part name={info.name[0]} num_exercises={info.num_exercises[0]} />
    <Part name={info.name[1]} num_exercises={info.num_exercises[1]} />
    <Part name={info.name[2]} num_exercises={info.num_exercises[2]} />
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
    <Header title={course} />
    <Content name={[part1, part2, part3]} num_exercises={[exercises1, exercises2, exercises3]} />
    <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
