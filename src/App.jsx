import { hot, setConfig } from 'react-hot-loader'
import React, { useEffect, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { route } = this.props

    return renderRoutes(route.routes)
  }
}

export default hot(module)(App)
