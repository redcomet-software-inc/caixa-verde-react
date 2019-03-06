// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  RESET,
} from './constants';

export function reset() {
  return {
    type: 'RESET',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RESET:
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('checkout_order_id');
      return {
        ...state,
        logged_in: false,
      };

    default:
      return state;
  }
}
