import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import {
  ThemeProvider,
  StylesProvider,
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'

import theme from './theme'

function Main() {
  // useEffect(() => {
  //   const jssStyles = document.querySelector(
  //     '#jss-server-side',
  //   )
  //   if (jssStyles) {
  //     jssStyles.parentNode.removeChild(jssStyles)
  //   }
  // }, [])

  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StylesProvider>
  )
}

hydrate(<Main />, document.getElementById('app'))
