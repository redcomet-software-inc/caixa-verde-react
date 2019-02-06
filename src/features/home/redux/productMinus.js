// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_PRODUCT_MINUS,
} from './constants';

export function productMinus(product) {
  let id = product.product_id
  return {
    type: HOME_PRODUCT_MINUS,
    product,
    id,
  };
}

export function reducer(state, action) {

  switch (action.type) {
  case HOME_PRODUCT_MINUS:
  let products = state.products;
  products["product" + action.id ] =  action.product;
    return {
      ...state,
      products,
    };
    default:
      return state;
  }
}
