import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TestHookState(props) {
  useEffect(() => {
    console.log('Hoook')
  })

  const [age, setAge] = useState(42)
  const [fruit, setFruit] = useState('banana')
  const [todos, setTodos] = useState([
    { text: 'Learn Hooks' },
  ])

  return (
    <div>
      <h1>
        {age} | {fruit}
      </h1>
      <h1>{todos.map((todo) => todo.text)}</h1>
      <div></div>
    </div>
  )
}
