import { createAction, handleActions } from 'redux-actions'
import { NavigationActions } from 'react-navigation'

export const actions = {
  setSearchKey: 'SEARCH/SET_KEY',
}

export const setSearchKey = createAction(actions.setSearchKey)

const initState = {
  searchKey: ''
}

export default handleActions({
  [actions.setSearchKey]: (state, action) => ({...state, searchKey: action.payload})
}, initState)