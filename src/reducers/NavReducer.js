import { NavigationActions } from 'react-navigation';
import { createAction, handleActions } from 'redux-actions';

import { AppNavigator } from '../navigators/AppNavigator';

export const actions = {
  authSuccess: 'NAV/AUTH_SUCCESS'
}

export const authSuccess = createAction(actions.authSuccess)

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Profile'));

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case actions.authSuccess:
      nextState = AppNavigator.router.getStateForAction(
        // reset navigation stack state
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
          ],
        }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Return original `state` if `nextState` is null/undefined
  return nextState || state;
};
