import {
  HOME_KIT_PLUS,
} from '../../../../src/features/home/redux/constants';

import {
  kitPlus,
  reducer,
} from '../../../../src/features/home/redux/kitPlus';

describe('home/redux/kitPlus', () => {
  it('returns correct action by kitPlus', () => {
    expect(kitPlus()).toHaveProperty('type', HOME_KIT_PLUS);
  });

  it('handles action type HOME_KIT_PLUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_KIT_PLUS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
