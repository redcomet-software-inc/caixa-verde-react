import {
  HOME_KIT_MINUS,
} from '../../../../src/features/home/redux/constants';

import {
  kitMinus,
  reducer,
} from '../../../../src/features/home/redux/kitMinus';

describe('home/redux/kitMinus', () => {
  it('returns correct action by kitMinus', () => {
    expect(kitMinus()).toHaveProperty('type', HOME_KIT_MINUS);
  });

  it('handles action type HOME_KIT_MINUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_KIT_MINUS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
