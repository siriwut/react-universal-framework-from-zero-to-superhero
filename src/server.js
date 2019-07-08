import express from 'express'
import { renderToString } from 'react-dom/server'
import { compile } from 'handlebars'

import template from './template.handlebars'

const app = express()

app.get('*', function(req, res) {
  const html = compile(template)

  res.send(html())
})

export default app
