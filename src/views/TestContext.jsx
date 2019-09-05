import React, {
  useState,
  useEffect,
  createContext,
} from 'react'
import { Link } from 'react-router-dom'

const ColorContext = createContext('red')

function ThemedThing() {
  return (
    <div>
      <ColorContext.Provider value={'blue'}>
        <h1>Themed Thing</h1>
        <div>
          <ColorContext.Consumer>
            {(value) => <div>{value}</div>}
          </ColorContext.Consumer>
        </div>
      </ColorContext.Provider>
    </div>
  )
}

export default function TestContext() {
  return <ThemedThing />
}
