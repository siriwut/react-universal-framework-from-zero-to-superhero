import { hot, setConfig } from 'react-hot-loader'
import React, { useEffect } from 'react'
import Routes from './routes'

export function App() {
  return <Routes />
}

export default hot(module)(App)
