// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_PRODUCTS,
} from './constants';

export function products(products) {
  return {
    type: HOME_PRODUCTS,
    products,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    default:
      return state;
  }
}
