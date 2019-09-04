import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import express from 'express'
import http from 'http'
import path from 'path'

import clientConfig from './webpack.client.dev'
import serverConfig from './webpack.server.dev'

const app = express()

const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

app.use(
  webpackDevMiddleware(
    clientCompiler,
    clientConfig.devServer,
  ),
)
app.use(webpackHotMiddleware(clientCompiler))

clientCompiler.hooks.done.tap(
  'BuildStatsPlugin',
  (stats) => {
    serverCompiler.watch(
      serverConfig.devServer,
      (stats) => {},
    )
  },
)

const server = http.createServer(app)

server.listen(
  process.env.DEV_SERVER_PORT || 8000,
  (error) => {
    if (error) {
      console.log(error)
    }

    console.log('🚀 started')
  },
)
