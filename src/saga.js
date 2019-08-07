import {
  put,
  take,
  takeEvery,
  all,
} from 'redux-saga/effects'

export default function* saga() {
  yield all([sub1(), sub2(), sub3()])
}

function* sub1() {
  yield put({ type: 'SUB1', payload: { name: 'SUB1' } })
}

function* sub2() {
  yield take('SUB1')
  yield put({ type: 'SUB2', payload: { name: 'SUB2' } })
}

function* sub3() {
  yield take('SUB2')
  yield put({ type: 'SUB3', payload: { name: 'SUB3' } })
}
