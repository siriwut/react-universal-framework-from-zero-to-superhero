import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './views/Home'
import About from './views/About'

import { LOAD_HOME } from './constants'

export default function routes({ store } = {}) {
  return [
    {
      component: App,
      routes: [
        {
          path: '/',
          exact: true,
          component: Home,
          prefetch: () => {
            store.dispatch({ type: LOAD_HOME })
          },
        },
        {
          path: '/about',
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
