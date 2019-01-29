// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_REDIRECT,
} from './constants';

/* Accepts Params */
export function redirect(value) {
  return {
    type: HOME_REDIRECT,
    value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REDIRECT:
      return {
        ...state,
        redirect:true,
        redirectTo: action.value,
      };

    default:
      return state;
  }
}
