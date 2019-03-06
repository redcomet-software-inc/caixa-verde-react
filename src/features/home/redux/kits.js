// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_KITS,
} from './constants';

export function kits(kits) {
  return {
    type: HOME_KITS,
    kits,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_KITS:
      return {
        ...state,
        kits: action.kits,
      };

    default:
      return state;
  }
}
