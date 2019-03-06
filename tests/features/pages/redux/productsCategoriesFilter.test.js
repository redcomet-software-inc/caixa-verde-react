import {
  PAGES_PRODUCTS_CATEGORIES_FILTER,
} from '../../../../src/features/pages/redux/constants';

import {
  productsCategoriesFilter,
  reducer,
} from '../../../../src/features/pages/redux/productsCategoriesFilter';

describe('pages/redux/productsCategoriesFilter', () => {
  it('returns correct action by productsCategoriesFilter', () => {
    expect(productsCategoriesFilter()).toHaveProperty('type', PAGES_PRODUCTS_CATEGORIES_FILTER);
  });

  it('handles action type PAGES_PRODUCTS_CATEGORIES_FILTER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PAGES_PRODUCTS_CATEGORIES_FILTER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
