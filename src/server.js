import React from 'react'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { compile } from 'handlebars'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ServerStyleSheets,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/styles'

import theme from './theme'

import App from './App'
import template from './template.handlebars'

const app = express()

function handleRenderHtml(req, res) {
  const materialSheets = new ServerStyleSheets()
  const html = renderToString(
    materialSheets.collect(
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StylesProvider>,
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
