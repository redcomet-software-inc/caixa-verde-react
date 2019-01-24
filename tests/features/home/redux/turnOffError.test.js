import {
  HOME_TURN_OFF_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  turnOffError,
  reducer,
} from '../../../../src/features/home/redux/turnOffError';

describe('home/redux/turnOffError', () => {
  it('returns correct action by turnOffError', () => {
    expect(turnOffError()).toHaveProperty('type', HOME_TURN_OFF_ERROR);
  });

  it('handles action type HOME_TURN_OFF_ERROR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_TURN_OFF_ERROR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
