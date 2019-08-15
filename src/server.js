import http from 'http'
import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import { compile } from 'handlebars'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory } from 'history'
import { StaticRouter, matchPath } from 'react-router-dom'
import {
  matchRoutes,
  renderRoutes,
} from 'react-router-config'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles'

import { Provider } from 'react-redux'

import theme from './theme'
import template from './template.handlebars'

import getRoutes from './getRoutes'
import loadPrefetch from './helpers/loadPrefetch'

import configureStore from './configureStore'
import reducer from './reducer'
import rootSaga from './saga'

import config from '../webpack.client.dev'

import App from './App'

const server = express()

server.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

// server.use(
//   favicon(
//     path.join(
//       __dirname,
//       '..',
//       'build',
//       'public',
//       'favicon.ico',
//     ),
//   ),
// )

function handleRenderHtml(req, res, next) {
  const { store, runSaga, closeSaga } = configureStore(
    reducer,
  )

  const routes = getRoutes({ store })
  const url = req.url

  const materialSheets = new ServerStyleSheets()
  const context = {}
  const renderHtml = () => {
    const html = renderToString(
      materialSheets.collect(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <StaticRouter
              location={url}
              context={context}
              history={createMemoryHistory()}>
              {renderRoutes(routes)}
            </StaticRouter>
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

  Promise.all([
    runSaga(rootSaga).toPromise(),
    loadPrefetch(routes, url),
  ])
    .then(() => {
      const { html, css } = renderHtml()
      res.status(200).send(
        template({
          body: html,
          materialCss: css,
          bundleSrc:
            process.env.NODE_ENV === 'production'
              ? '/client.js'
              : 'http://localhost:8000/client.js',
          initialState: serialize(store.getState()),
        }),
      )
    })
    .catch((e) => res.status(500).send(e.message))

  renderHtml()
  closeSaga()
}

server.get('/*', handleRenderHtml)

export default server
