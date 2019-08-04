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

import config from '../webpack.client.dev'

const app = express()

function handleRenderHtml(req, res) {
  // const { store, runSaga, closeSaga } = configureStore(
  //   reducer,
  // )
  //
  // const materialSheets = new ServerStyleSheets()
  // const renderHtml = () => {
  //   const html = renderToString(
  //     materialSheets.collect(
  //       <Provider store={store}>
  //         <ThemeProvider theme={theme}>
  //           <App />
  //         </ThemeProvider>
  //       </Provider>,
  //     ),
  //   )
  //
  //   const materialCss = materialSheets.toString()
  //
  //   return {
  //     html,
  //     css: materialCss,
  //   }
  // }
  //
  // console.log('[saga] start')
  // console.log('[saga] running...')
  // runSaga(rootSaga)
  //   .toPromise()
  //   .then(() => {
  //     console.log('[saga] done')
  //     const { html, css } = renderHtml()
  //
  //     res.status(200).send(
  //       template({
  //         body: html,
  //         materialCss: css,
  //       }),
  //     )
  //   })
  //   .catch((e) => res.status(500).send(e.message))
  //
  // closeSaga()
  // console.log('[server] do another...')
  console.log('helll')
  res.status(200).json({
    name: 'tape name',
  })
}

app.get('/', handleRenderHtml)

export default app
