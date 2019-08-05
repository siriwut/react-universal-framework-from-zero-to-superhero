import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import express from 'express'
import http from 'http'
import path from 'path'

import clientConfig from './webpack.client.dev'
import serverConfig from './webpack.server.dev'

const devApp = express()

const [clientCompiler, serverCompiler] = webpack([
  clientConfig,
  serverConfig,
])

devApp.use(
  webpackDevMiddleware(clientCompiler, {
    noInfo: true,
    publicPath: clientConfig.output.publicPath,
  }),
)
devApp.use(webpackHotMiddleware(clientCompiler))
devApp.use(express.static(path.resolve(__dirname, 'src')))

clientCompiler.hooks.done.tap(
  'BuildStatsPlugin',
  (stats) => {},
)

const devServer = http.createServer(devApp)

devServer.listen(process.env.PORT || 8000, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
