import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.get('*', function(req, res) {
  res.send('Hello World!')
})

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
