// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_PRODUCT_MINUS,
} from './constants';

export function productMinus() {
  return {
    type: HOME_PRODUCT_MINUS,
  };
}

export function reducer(state, action) {
  let value = state.productsCount
  value - 1 <= 0 ? value = 0 : value -= 1;
  switch (action.type) {
  
    case HOME_PRODUCT_MINUS:
      return {
        ...state,
        productsCount: value,
      };

    default:
      return state;
  }
}
