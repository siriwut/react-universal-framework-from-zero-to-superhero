import React from 'react'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { compile } from 'handlebars'

import App from './App'
import template from './template.handlebars'

const app = express()

app.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
)

app.get('/', function(req, res) {
  const html = renderToString(<App />)

  res.send(template({ body: html }))
})

export default app
