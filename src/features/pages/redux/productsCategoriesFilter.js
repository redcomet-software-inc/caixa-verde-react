// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  PAGES_PRODUCTS_CATEGORIES_FILTER,
} from './constants';

export function productsCategoriesFilter(filter) {
  return {
    type: PAGES_PRODUCTS_CATEGORIES_FILTER,
    filter,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAGES_PRODUCTS_CATEGORIES_FILTER:
      return {
        ...state,
        products_category_filter: action.filter,
      };

    default:
      return state;
  }
}
