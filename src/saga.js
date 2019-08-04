import {
  put,
  take,
  takeEvery,
  all,
} from 'redux-saga/effects'

export default function* saga() {
  // yield put({ type: 'INITIAL' })
  yield all([sub1(), sub2(), sub3()])
}

function* sub1() {
  // yield take('INITIAL')
  console.log('[saga] sub1')
  yield put({ type: 'SUB1' })
}

function* sub2() {
  yield take('SUB1')
  console.log('[saga] sub2')
  yield put({ type: 'SUB2' })
}

function* sub3() {
  yield take('SUB2')
  console.log('[saga] sub3')
  yield put({ type: 'SUB3' })
}
