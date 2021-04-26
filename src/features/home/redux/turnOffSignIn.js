// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_TURN_OFF_SIGN_IN,
} from './constants';

export function turnOffSignIn() {
  return {
    type: HOME_TURN_OFF_SIGN_IN,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_TURN_OFF_SIGN_IN:
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('checkout_order_id');
      return {
        ...state,
        logged_in: false
      };

    default:
      return state;
  }
}
