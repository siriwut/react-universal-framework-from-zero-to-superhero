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
import rootSaga from './saga'

const app = express()

function handleRenderHtml(req, res) {
  const { store, runSaga, closeSaga } = configureStore(
    reducer,
  )

  const materialSheets = new ServerStyleSheets()
  const renderHtml = () => {
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

    return {
      html,
      css: materialCss,
    }
  }

  runSaga(rootSaga)
    .toPromise()
    .then(() => {
      const { html, css } = renderHtml()

      res.status(200).send(
        template({
          body: html,
          materialCss: css,
        }),
      )
    })
    .catch((e) => res.status(500).send(e.message))
}

app.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

app.use(handleRenderHtml)

export default app
