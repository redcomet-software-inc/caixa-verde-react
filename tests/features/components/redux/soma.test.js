import {
  COMPONENTS_SOMA,
} from '../../../../src/features/components/redux/constants';

import {
  soma,
  reducer,
} from '../../../../src/features/components/redux/soma';

describe('components/redux/soma', () => {
  it('returns correct action by soma', () => {
    expect(soma()).toHaveProperty('type', COMPONENTS_SOMA);
  });

  it('handles action type COMPONENTS_SOMA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMPONENTS_SOMA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
