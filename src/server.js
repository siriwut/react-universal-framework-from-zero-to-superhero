import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import http from 'http'
import path from 'path'
import favicon from 'serve-favicon'
import { compile } from 'handlebars'
import {
  match,
  createMemoryHistory,
  StaticRouter,
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles'

import { Provider } from 'react-redux'
import routes from './routes'

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

function handleRenderHtml(req, res) {
  const { store, runSaga, closeSaga } = configureStore(
    reducer,
  )

  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(
          302,
          redirectLocation.pathname +
            redirectLocation.search,
        )
      } else if (renderProps && renderProps.components) {
        const materialSheets = new ServerStyleSheets()
        const renderHtml = () => {
          const html = renderToString(
            materialSheets.collect(
              <Provider store={store}>
                <ThemeProvider theme={theme}>
                  <StaticRouter>
                    <App />
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

        runSaga(rootSaga)
          .toPromise()
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
                reduxStoreState: JSON.stringify(
                  store.getState(),
                ),
              }),
            )
          })
          .catch((e) => res.status(500).send(e.message))

        closeSaga()
      }
    },
  )
}

server.use(handleRenderHtml)

export default server
