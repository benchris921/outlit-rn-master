import { call, put, takeEvery } from 'redux-saga/effects'
import { hasIn } from 'lodash'

import { actions } from '../AuthReducer'
import { createUser, loginUser, loginWithFacebook } from '../../Api/Auth';

export function* createUserAction(action) {
  const result = yield call(createUser, action.payload.email, action.payload.username, action.payload.password)
  if(hasIn(result, 'error'))
    yield put({type: actions.loginUserFailed, payload: result.detail.message})
  else {
    yield put({type: actions.loginUserSuccess, payload: result})
    yield put({type: actions.authSuccess})
  }
}

export function* loginUserAction(action) {
  const result = yield call(loginUser, action.payload.email, action.payload.password)
  if(hasIn(result, 'error'))
    yield put({type: actions.loginUserFailed, payload: result.detail.message})
  else{
    yield put({type: actions.loginUserSuccess, payload: result})
    yield put({type: actions.authSuccess})
  }
}

export function* fbLoginUserAction(action) {
  const result = yield call(loginWithFacebook)
  if(hasIn(result, 'error'))
    yield put({type: actions.loginUserFailed, payload: result.detail.message})
  else{
    yield put({type: actions.loginUserSuccess, payload: result})
    yield put({type: actions.authSuccess})
  }
}

const AuthSaga = function* Auth() {
  yield takeEvery(actions.createUser, createUserAction)
  yield takeEvery(actions.loginUser, loginUserAction)
  yield takeEvery(actions.fbLoginUser, fbLoginUserAction)
}

export default AuthSaga