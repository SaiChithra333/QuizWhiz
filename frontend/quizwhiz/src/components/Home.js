import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/Takequiz">Take Quiz</Link>
      <Link to="/Register">Register</Link>
      <Link to="/Login">Login</Link>
    </div>
  )
}

export default Home
