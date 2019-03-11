import { createAction, handleActions } from 'redux-actions'

export const actions = {
  loginUser: 'AUTH/LOGIN_USER',
  fbLoginUser: 'AUTH/FB_LOGIN_USER',
  loginUserSuccess: 'AUTH/LOGIN_USER_SUCCESS',
  loginUserFailed: 'AUTH/LOGIN_USER_FAILED',
  createUser: 'AUTH/CREATE_USER',
  createUserSuccess: 'AUTH/CREATE_USER_SUCCESS',
  createUserFailed: 'AUTH/CREATE_USER_FAILED',
  authSuccess: 'NAV/AUTH_SUCCESS'
}

export const loginUser = createAction(actions.loginUser)
export const loginUserSuccess = createAction(actions.loginUserSuccess)
export const loginUserFailed = createAction(actions.loginUserFailed)
export const fbLoginUser = createAction(actions.fbLoginUser)
export const createUser = createAction(actions.createUser)
export const createUserSuccess = createAction(actions.createUserSuccess)
export const createUserFailed = createAction(actions.createUserFailed)

const defaultState = {
  userInfo: {},
  error: ''
}

export default handleActions({
  [actions.loginUser]: (state, action) => ({ ...state, error: '' }),
  [actions.fbLoginUser]: (state, action) => ({ ...state, error: '' }),
  [actions.loginUserSuccess]: (state, action) => ({ ...state, userInfo: action.payload, error: 'Success!' }),
  [actions.loginUserFailed]: (state, action) => ({ ...state, error: action.payload }),
  [actions.createUser]: (state, action) => ({ ...state, error: '' }),
  [actions.createUserSuccess]: (state, action) => ({ ...state, userInfo: action.payload, error: 'Success!' }),
  [actions.createUserFailed]: (state, action) => ({ ...state, error: action.payload })
}, defaultState)
