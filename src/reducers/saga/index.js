import { all } from 'redux-saga/effects'
import AuthSaga from './AuthSaga'
import EventSaga from './EventSaga'
import VenueSaga from './VenueSaga'

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    EventSaga(),
    VenueSaga(),
  ])
}