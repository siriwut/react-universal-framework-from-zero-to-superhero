import {
  put,
  take,
  takeEvery,
  all,
  fork,
} from 'redux-saga/effects'

import { LOAD_HOME } from './constants'

export default function* saga() {
  // yield all([sub1(), sub2(), sub3()])
  yield all([fork(sub1)])
}

function* sub1() {
  yield takeEvery(LOAD_HOME, function*() {
    console.log('load home')
  })
}

// function* sub1() {
//   yield put({ type: 'SUB1', payload: { name: 'SUB1' } })
// }
//
// function* sub2() {
//   yield take('SUB1')
//   yield put({ type: 'SUB2', payload: { name: 'SUB2' } })
// }
//
// function* sub3() {
//   yield take('SUB2')
//   yield put({ type: 'SUB3', payload: { name: 'SUB3' } })
// }
