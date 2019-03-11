import { createAction, handleActions } from 'redux-actions'

export const actions = {
  getLocalVenues: 'DATA/GET_LOCAL_VENUES',
  setVenues: 'DATA/SET_VENUES'
}

export const getLocalVenues = createAction(actions.getLocalVenues)
export const setVenues = createAction(actions.setVenues)

const INITIAL_STATE = {
  venues: [],
};

export default handleActions({
  [actions.setVenues]: (state, action) => ({ ...state, venues: action.payload })
}, INITIAL_STATE)
