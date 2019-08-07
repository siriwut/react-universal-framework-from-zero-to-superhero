import { hot, setConfig } from 'react-hot-loader'
import React, { useEffect } from 'react'
import Home from './Home'

export function App(props) {
  return <Home name="Alligator" />
}

export default hot(module)(App)
