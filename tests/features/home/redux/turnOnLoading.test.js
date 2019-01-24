import {
  HOME_TURN_ON_LOADING,
} from '../../../../src/features/home/redux/constants';

import {
  turnOnLoading,
  reducer,
} from '../../../../src/features/home/redux/turnOnLoading';

describe('home/redux/turnOnLoading', () => {
  it('returns correct action by turnOnLoading', () => {
    expect(turnOnLoading()).toHaveProperty('type', HOME_TURN_ON_LOADING);
  });

  it('handles action type HOME_TURN_ON_LOADING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_TURN_ON_LOADING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
