import {
  HOME_PRODUCT_PLUS,
} from '../../../../src/features/home/redux/constants';

import {
  productPlus,
  reducer,
} from '../../../../src/features/home/redux/productPlus';

describe('home/redux/productPlus', () => {
  it('returns correct action by productPlus', () => {
    expect(productPlus()).toHaveProperty('type', HOME_PRODUCT_PLUS);
  });

  it('handles action type HOME_PRODUCT_PLUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_PRODUCT_PLUS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
