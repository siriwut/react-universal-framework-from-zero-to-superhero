import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './views/Home'
import About from './views/About'
import TestHooks from './views/TestHooks'
import TestContext from './views/TestContext'

export default function routes({ store } = {}) {
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
        // {
        //   path: '/test/:id',
        //   exact: true,
        //   component: () => 'test',
        // },
        {
          path: '/test/hooks',
          component: TestHooks,
          // prefetch: async () => {
          //   store.dispatch({ type: 'LOAD_HOME' })
          // },
        },
        {
          path: '/test/context',
          component: TestContext,
          // prefetch: async () => {
          //   store.dispatch({ type: 'LOAD_HOME' })
          // },
        },
        {
          component: () => 'Not Found',
        },
      ],
    },
  ]
}
