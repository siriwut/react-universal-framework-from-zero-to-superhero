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
  webpackDevMiddleware(clientCompiler, {
    // proxy: {
    //   '*': {
    //     target: 'http://localhost:3000',
    //   },
    // },
    // contentBase: './build/public',
    noInfo: false,
    publicPath: clientConfig.output.publicPath,
    // port: 8000,
    // host: '0.0.0.0',
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }),
)

app.use(
  webpackHotMiddleware(clientCompiler, {
    // path: 'localhost:8000/__webpack_hmr',
  }),
)

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

server.listen(process.env.PORT || 8000, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
