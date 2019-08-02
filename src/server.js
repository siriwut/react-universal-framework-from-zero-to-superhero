import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import path from 'path'
import { compile } from 'handlebars'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles'

import { Provider } from 'react-redux'

import theme from './theme'
import template from './template.handlebars'

import App from './App'

import configureStore from './configureStore'
import reducer from './reducer'

const app = express()

function handleRenderHtml(req, res) {
  const store = configureStore(reducer)

  const materialSheets = new ServerStyleSheets()
  const html = renderToString(
    materialSheets.collect(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>,
    ),
  )
  const materialCss = materialSheets.toString()

  res.send(
    template({ body: html, materialCss: materialCss }),
  )
}

app.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

app.use(handleRenderHtml)

export default app
