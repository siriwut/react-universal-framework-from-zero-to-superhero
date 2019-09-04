import {
  put,
  take,
  takeEvery,
  all,
  fork,
  call,
  spawn,
  END,
} from 'redux-saga/effects'
import * as fakeApi from './fakeApi'

export default function* saga() {
  yield all([fork(sub1), fork(sub2)])
}

function* sub1() {
  yield takeEvery('LOAD_HOME', function*() {
    const data = yield call(fakeApi.get, 5000)

    yield put({
      type: 'LOAD_HOME_SUCCESS',
      payload: { home: 'Home', data: data },
    })
  })
}

function* sub2() {
  yield takeEvery('LOAD_HOME_SUCCESS', function*() {
    const data = yield call(fakeApi.get, 5000)
    yield put({ type: 'SUB2', payload: { name: 'SUB2' } })
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
