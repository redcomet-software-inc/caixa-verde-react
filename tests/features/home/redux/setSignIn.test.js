import {
  HOME_SET_SIGN_IN,
} from '../../../../src/features/home/redux/constants';

import {
  setSignIn,
  reducer,
} from '../../../../src/features/home/redux/setSignIn';

describe('home/redux/setSignIn', () => {
  it('returns correct action by setSignIn', () => {
    expect(setSignIn()).toHaveProperty('type', HOME_SET_SIGN_IN);
  });

  it('handles action type HOME_SET_SIGN_IN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_SIGN_IN }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
