import React from 'react'
import { Link } from 'react-router-dom'

export default function About(props) {
  return (
    <div>
      <Link to="/">Home</Link> |{' '}
      <Link to="/test/2">Test</Link>
    </div>
  )
}
