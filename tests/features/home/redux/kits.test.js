import {
  HOME_KITS,
} from '../../../../src/features/home/redux/constants';

import {
  kits,
  reducer,
} from '../../../../src/features/home/redux/kits';

describe('home/redux/kits', () => {
  it('returns correct action by kits', () => {
    expect(kits()).toHaveProperty('type', HOME_KITS);
  });

  it('handles action type HOME_KITS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_KITS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
