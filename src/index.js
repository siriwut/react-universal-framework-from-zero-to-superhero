import express from 'express'
import http from 'http'

let app = require('./server').default

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const server = http.createServer(app)

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
