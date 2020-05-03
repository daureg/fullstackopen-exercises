import React from 'react'

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

export default Course
