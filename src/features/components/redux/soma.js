// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMPONENTS_SOMA,
} from './constants';

export function soma() {
  return {
    type: COMPONENTS_SOMA, soma
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMPONENTS_SOMA:
      return [...state,
        Object.assing({}, action.soma)
      ];
    
    default:
      return state;
  }
}
