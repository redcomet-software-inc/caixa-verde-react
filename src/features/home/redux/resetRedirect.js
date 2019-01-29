// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_RESET_REDIRECT,
} from './constants';

export function resetRedirect() {
  return {
    type: HOME_RESET_REDIRECT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_RESET_REDIRECT:
      return {
        ...state,
        redirect:false,
      };

    default:
      return state;
  }
}
