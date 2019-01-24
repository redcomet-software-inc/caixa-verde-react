// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_TURN_OFF_ERROR,
} from './constants';

export function turnOffError() {
  return {
    type: HOME_TURN_OFF_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_TURN_OFF_ERROR:
      return {
        ...state,
        isError: false,
      };

    default:
      return state;
  }
}
