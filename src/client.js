import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import {
  ThemeProvider,
  StylesProvider,
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import {
  matchRoutes,
  renderRoutes,
} from 'react-router-config'

import App from './App'

import routes from './routes'
import theme from './theme'

import configureStore from './configureStore'
import reducer from './reducer'
import rootSaga from './saga'

const { store, runSaga } = configureStore(
  reducer,
  window.__INITIAL_STATE__ || {},
)

runSaga(rootSaga)

function Main() {
  useEffect(() => {
    const jssStyles = document.querySelector(
      '#jss-server-side',
    )
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <BrowserRouter>
      {renderRoutes(routes({ store }))}
    </BrowserRouter>
  )
}

hydrate(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
)

if (module.hot) {
  module.hot.accept()
}
