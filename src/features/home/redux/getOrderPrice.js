// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_GET_ORDER_PRICE,
} from './constants';

export function getOrderPrice() {
  return {
    type: HOME_GET_ORDER_PRICE,
  };
}

 /* Check if a Giving Object is Empty */
export const isEmpty = function (obj){
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
}

export const order_priceB = (myObject) => {
    let value = 0;
    if(isEmpty(myObject) === false) {
      for(var key in myObject) {
        value += myObject[key].price * myObject[key].quantity;
      }
    }
    return value;
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_ORDER_PRICE:
    let order_price = 0;
    let price_products = order_priceB(state.products);
    let price_kits = order_priceB(state.kits);
    order_price = price_products + price_kits;
      return {
        ...state,
        order_price,
      };

    default:
      return state;
  }
}
