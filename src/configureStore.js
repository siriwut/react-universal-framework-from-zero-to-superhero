import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootSaga from './saga'

export default function configureStore(
  reducer,
  initialState = {},
) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
  )

  return {
    store,
    runSaga: sagaMiddleware.run,
    closeSaga: () => store.dispatch(END),
  }
}
