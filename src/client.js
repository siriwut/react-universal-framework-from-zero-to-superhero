import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import {
  ThemeProvider,
  StylesProvider,
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Provider } from 'react-redux'

import App from './App'
import theme from './theme'

import configureStore from './configureStore'
import reducer from './reducer'
import rootSaga from './saga'

const { store, runSaga } = configureStore(reducer)

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

  return <App />
}

hydrate(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
)
