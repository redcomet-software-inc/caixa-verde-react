import {
  RESET,
} from '../../../../src/features/home/redux/constants';

import {
  reset,
  reducer,
} from '../../../../src/features/home/redux/reset';

describe('home/redux/reset', () => {
  it('returns correct action by reset', () => {
    expect(reset()).toHaveProperty('type', RESET);
  });

  it('handles action type RESET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RESET }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
