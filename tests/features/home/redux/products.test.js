import {
  HOME_PRODUCTS,
} from '../../../../src/features/home/redux/constants';

import {
  products,
  reducer,
} from '../../../../src/features/home/redux/products';

describe('home/redux/products', () => {
  it('returns correct action by products', () => {
    expect(products()).toHaveProperty('type', HOME_PRODUCTS);
  });

  it('handles action type HOME_PRODUCTS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_PRODUCTS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
