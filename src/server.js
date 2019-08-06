import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import http from 'http'
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

import config from '../webpack.client.dev'

const server = express()

server.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

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
  console.log('hello')
  runSaga(rootSaga)
    .toPromise()
    .then(() => {
      const { html, css } = renderHtml()

      res.status(200).send(
        template({
          body: html,
          materialCss: css,
          bundleSrc:
            process.env.ENV === 'prod'
              ? '/client.js'
              : 'http://localhost:8000/client.js',
        }),
      )
    })
    .catch((e) => res.status(500).send(e.message))

  closeSaga()
}

server.get('/', handleRenderHtml)

export default server
