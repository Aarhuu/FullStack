const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <ul>
    {parts.map(single => 
    <li key={single.id}>
      <Part part = {single}></Part>
    </li>)
    }
  </ul>
  

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}></Content>
      <Total sum = {course.parts.map(single => single.exercises).reduce((a,b) => a + b )}></Total> 
    </div>
  )
}

export default Course