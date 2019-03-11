import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { hasIn } from 'lodash'

import { actions } from '../EventReducer'
import { getLocalEvents } from '../../Api/Event'

export function* getLocalEventsAction(action) {
  const result = yield call(getLocalEvents, action.payload)
  yield put({type: actions.setEvents, payload: result})
}

const EventSaga = function* Event() {
  yield takeLatest(actions.getLocalEvents, getLocalEventsAction)
}

export default EventSaga