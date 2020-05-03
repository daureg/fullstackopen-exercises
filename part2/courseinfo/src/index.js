import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, val) => acc + val.exercises, 0)
  return(
    <p>Number of exercises {total}</p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
    {course.parts.map(p => <Part part={p} key={p.id} />)}
    </div>
  )
}
const Course = ({course}) => {
  return (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
  )
}
const App = () => {
  const courses = [ {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 9,
        id: 4
      }
    ]
    }, {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
    }
  ]

  return (
    <div>
    {courses.map(c => <Course course={c} key={c.id} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
