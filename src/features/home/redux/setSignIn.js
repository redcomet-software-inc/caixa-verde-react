// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_SET_SIGN_IN,
} from './constants';

export function setSignIn() {
  return {
    type: HOME_SET_SIGN_IN,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_SIGN_IN:
      return {
        ...state,
        logged_in: true,
      };

    default:
      return state;
  }
}
