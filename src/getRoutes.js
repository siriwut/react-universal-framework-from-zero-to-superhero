import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './views/Home'
import About from './views/About'

export default function getRoutes({ store } = {}) {
  return [
    {
      component: App,
      routes: [
        {
          path: '/',
          exact: true,
          component: Home,
          prefetch: async () => {
            store.dispatch({ type: 'LOAD_HOME' })
          },
        },
        {
          path: '/about',
          component: About,
          prefetch: async () => {
            store.dispatch({ type: 'LOAD_HOME' })
          },
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
