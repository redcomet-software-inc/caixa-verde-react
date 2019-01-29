import {
  HOME_RESET_REDIRECT,
} from '../../../../src/features/home/redux/constants';

import {
  resetRedirect,
  reducer,
} from '../../../../src/features/home/redux/resetRedirect';

describe('home/redux/resetRedirect', () => {
  it('returns correct action by resetRedirect', () => {
    expect(resetRedirect()).toHaveProperty('type', HOME_RESET_REDIRECT);
  });

  it('handles action type HOME_RESET_REDIRECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_RESET_REDIRECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
