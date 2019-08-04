import express from 'express'
import http from 'http'

import app from './server'

const server = http.createServer(app)

app.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
