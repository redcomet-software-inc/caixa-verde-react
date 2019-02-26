import {
  HOME_GET_ORDER_PRICE,
} from '../../../../src/features/home/redux/constants';

import {
  getOrderPrice,
  reducer,
} from '../../../../src/features/home/redux/getOrderPrice';

describe('home/redux/getOrderPrice', () => {
  it('returns correct action by getOrderPrice', () => {
    expect(getOrderPrice()).toHaveProperty('type', HOME_GET_ORDER_PRICE);
  });

  it('handles action type HOME_GET_ORDER_PRICE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_GET_ORDER_PRICE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
