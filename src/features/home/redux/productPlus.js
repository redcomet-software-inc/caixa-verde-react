// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_PRODUCT_PLUS,
} from './constants';
import { count } from  '../../../features/home/local-actions';

export function productPlus(product, box) {
  let id = product.product_id
  return {
    type: HOME_PRODUCT_PLUS,
    count,
    product,
    box,
    id,
  };
}


export function reducer(state, action) {
  
  switch (action.type) {
    case HOME_PRODUCT_PLUS:
    let selected_products = state.selected_products;
    let myBoxProducts = state.myBoxProducts;
    selected_products["product" + action.id ] =  action.product;
    myBoxProducts["myBoxProduct" + action.id] = action.box;
    let count = action.count(selected_products, state.selected_kits)
    return {
      ...state,
      selected_products,
      myBoxProducts,
      count,
    };

    default:
      return state;
  }
}
