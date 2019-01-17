import {
  PAGES_GET_CLIENT_INFO,
} from '../../../../src/features/pages/redux/constants';

import {
  getClientInfo,
  reducer,
} from '../../../../src/features/pages/redux/getClientInfo';

describe('pages/redux/getClientInfo', () => {
  it('returns correct action by getClientInfo', () => {
    expect(getClientInfo()).toHaveProperty('type', PAGES_GET_CLIENT_INFO);
  });

  it('handles action type PAGES_GET_CLIENT_INFO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PAGES_GET_CLIENT_INFO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
