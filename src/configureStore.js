import { createStore, applyMiddleware } from 'redux'
import createSagaMonitor from '@clarketm/saga-monitor'
import createSagaMiddleware, { END } from 'redux-saga'

import rootSaga from './saga'
import { composeWithDevTools } from 'redux-devtools-extension'

const config = {
  level: 'log',
  effectTrigger: true,
  effectResolve: true,
  actionDispatch: true,
}

export default function configureStore(
  reducer,
  initialState = {},
) {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: createSagaMonitor(config),
  })
  const middleware = [sagaMiddleware]
  const enhancers =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware)

  const store = createStore(
    reducer,
    initialState,
    enhancers,
  )

  return {
    store,
    runSaga: sagaMiddleware.run,
    closeSaga: () => store.dispatch(END),
  }
}
