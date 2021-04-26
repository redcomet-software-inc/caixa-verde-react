import {
  HOME_TURN_OFF_SIGN_IN,
} from '../../../../src/features/home/redux/constants';

import {
  turnOffSignIn,
  reducer,
} from '../../../../src/features/home/redux/turnOffSignIn';

describe('home/redux/turnOffSignIn', () => {
  it('returns correct action by turnOffSignIn', () => {
    expect(turnOffSignIn()).toHaveProperty('type', HOME_TURN_OFF_SIGN_IN);
  });

  it('handles action type HOME_TURN_OFF_SIGN_IN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_TURN_OFF_SIGN_IN }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
