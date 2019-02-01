import {
  HOME_PRODUCT_MINUS,
} from '../../../../src/features/home/redux/constants';

import {
  productMinus,
  reducer,
} from '../../../../src/features/home/redux/productMinus';

describe('home/redux/productMinus', () => {
  it('returns correct action by productMinus', () => {
    expect(productMinus()).toHaveProperty('type', HOME_PRODUCT_MINUS);
  });

  it('handles action type HOME_PRODUCT_MINUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_PRODUCT_MINUS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
