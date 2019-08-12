import { hot, setConfig } from 'react-hot-loader'
import React, { useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

export function App({ route, ...rest }) {
  return renderRoutes(route.routes)
}

export default hot(module)(App)
