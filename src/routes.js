import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './views/Home'
import About from './views/About'

export default function routes() {
  return [
    {
      component: App,
      routes: [
        {
          path: '/',
          exact: true,
          component: Home,
        },
        {
          path: '/about/:id',
          component: About,
        },
        {
          path: '/test/:id',
          component: () => 'test',
        },
        {
          component: () => 'Not Found',
        },
      ],
    },
  ]
}
