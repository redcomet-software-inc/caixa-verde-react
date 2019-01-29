import {
  HOME_REDIRECT,
} from '../../../../src/features/home/redux/constants';

import {
  redirect,
  reducer,
} from '../../../../src/features/home/redux/redirect';

describe('home/redux/redirect', () => {
  it('returns correct action by redirect', () => {
    expect(redirect()).toHaveProperty('type', HOME_REDIRECT);
  });

  it('handles action type HOME_REDIRECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_REDIRECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
