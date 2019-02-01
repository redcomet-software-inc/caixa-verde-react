// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_PRODUCT_PLUS,
} from './constants';

export function productPlus(kind, value) {
  console.log("value");
  console.log(value);
  let id;
  if(kind === "product") {
    id = value.product_id
  } else if(kind === "kit") {
    id = value.kit_id
  }

  return {
    type: HOME_PRODUCT_PLUS,
    kind,
    value,
    id
  };
}

export function reducer(state, action) {
  let items = state.items
  if(action.id === undefined) {
    return state;
  }
  items[action.kind + action.id] =  action.value;
  switch (action.type) {
   
    case HOME_PRODUCT_PLUS:
      
      return {
        ...state,
        productsCount: state.productsCount + 1,
        items
      }
      

    default:
      return state;
  }
}
