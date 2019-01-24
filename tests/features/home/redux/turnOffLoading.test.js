import {
  HOME_TURN_OFF_LOADING,
} from '../../../../src/features/home/redux/constants';

import {
  turnOffLoading,
  reducer,
} from '../../../../src/features/home/redux/turnOffLoading';

describe('home/redux/turnOffLoading', () => {
  it('returns correct action by turnOffLoading', () => {
    expect(turnOffLoading()).toHaveProperty('type', HOME_TURN_OFF_LOADING);
  });

  it('handles action type HOME_TURN_OFF_LOADING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_TURN_OFF_LOADING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
