import { createStore } from 'redux'

export default function configureStore(
  reducer,
  initialState = {},
) {
  return createStore(reducer, initialState)
}
