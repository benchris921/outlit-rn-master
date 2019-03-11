import { createAction, handleActions } from 'redux-actions'

export const actions = {
  getLocalEvents: 'DATA/GET_LOCAL_EVENTS',
  setEvents: 'DATA/SET_EVENTS'
}

export const getLocalEvents = createAction(actions.getLocalEvents)
export const setEvents = createAction(actions.setEvents)

const INITIAL_STATE = {
  events: [],
};

export default handleActions({
  [actions.setEvents]: (state, action) => ({ ...state, events: action.payload })
}, INITIAL_STATE)
