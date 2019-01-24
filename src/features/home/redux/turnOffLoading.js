// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_TURN_OFF_LOADING,
} from './constants';

export function turnOffLoading() {
  return {
    type: HOME_TURN_OFF_LOADING,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_TURN_OFF_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}