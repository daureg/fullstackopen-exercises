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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
    <Header title={course} />
    <Content name={parts.map(p => p.name)} num_exercises={parts.map(p => p.exercises)} />
    <Total total={parts.map(p => p.exercises).reduce((a,b) => a+b)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
