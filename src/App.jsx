import { hot, setConfig } from 'react-hot-loader'
import React, { useEffect, Component } from 'react'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

class App extends Component {
  componentDidUpdate(curr, prev) {
    console.log('hello')
    console.log(prev)
    console.log(curr)
  }

  render() {
    const { route } = this.props

    return renderRoutes(route.routes)
  }
}

export default hot(module)(App)
