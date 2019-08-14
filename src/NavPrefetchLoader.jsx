import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'

import loadPrefetch from './helpers/loadPrefetch'

class NavPrefetchLoader extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props)

    this.state = {
      prevLocation: props.location,
    }
  }

  componentDidUpdate(prevProps) {
    const { location, routes } = this.props

    const navigated = !isEqual(prevProps.location, location)

    if (navigated) {
      this.setState({
        prevLocation: prevProps.location,
      })

      loadPrefetch(routes, location.pathname).then(() => {
        this.setState({
          prevLocation: null,
        })
      })
    }
  }

  render() {
    const { routes, children, location } = this.props
    const { prevLocation } = this.state

    return (
      <Route
        location={prevLocation || location}
        render={() => children}
      />
    )
  }
}

export default withRouter(NavPrefetchLoader)
