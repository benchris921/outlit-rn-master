import { call, put, takeLatest } from 'redux-saga/effects'
import { hasIn } from 'lodash'

import { actions } from '../VenueReducer'
import { getLocalVenues } from '../../Api/Venue'

export function* getLocalVenuesAction(action) {
  const result = yield call(getLocalVenues, action.payload)
  console.log(result)
  yield put({type: actions.setVenues, payload: result})
}

const VenueSaga = function* Event() {
  yield takeLatest(actions.getLocalVenues, getLocalVenuesAction)
}

export default VenueSaga