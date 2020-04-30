import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
  return ( <>
    <h1>{course.title}</h1>
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
    <Part name={info.parts[0].name} num_exercises={info.parts[0].exercises} />
    <Part name={info.parts[1].name} num_exercises={info.parts[1].exercises} />
    <Part name={info.parts[2].name} num_exercises={info.parts[2].exercises} />
    </>
  )
}
const Total = (exo) => {
  return ( <>
    <p>Number of exercises {exo.parts.map(p => p.exercises).reduce((a,b) => a+b)}</p>
    </>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total  parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
