import {
  HOME_TURN_ON_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  turnOnError,
  reducer,
} from '../../../../src/features/home/redux/turnOnError';

describe('home/redux/turnOnError', () => {
  it('returns correct action by turnOnError', () => {
    expect(turnOnError()).toHaveProperty('type', HOME_TURN_ON_ERROR);
  });

  it('handles action type HOME_TURN_ON_ERROR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_TURN_ON_ERROR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
