import {
  HOME_CLEAR_BOX,
} from '../../../../src/features/home/redux/constants';

import {
  clearBox,
  reducer,
} from '../../../../src/features/home/redux/clearBox';

describe('home/redux/clearBox', () => {
  it('returns correct action by clearBox', () => {
    expect(clearBox()).toHaveProperty('type', HOME_CLEAR_BOX);
  });

  it('handles action type HOME_CLEAR_BOX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLEAR_BOX }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
