import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CLIENT_DATA_BEGIN,
  HOME_GET_CLIENT_DATA_SUCCESS,
  HOME_GET_CLIENT_DATA_FAILURE,
  HOME_GET_CLIENT_DATA_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getClientData,
  dismissGetClientDataError,
  reducer,
} from '../../../../src/features/home/redux/getClientData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getClientData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getClientData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getClientData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLIENT_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLIENT_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when getClientData fails', () => {
    const store = mockStore({});

    return store.dispatch(getClientData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLIENT_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLIENT_DATA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetClientDataError', () => {
    const expectedAction = {
      type: HOME_GET_CLIENT_DATA_DISMISS_ERROR,
    };
    expect(dismissGetClientDataError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CLIENT_DATA_BEGIN correctly', () => {
    const prevState = { getClientDataPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIENT_DATA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClientDataPending).toBe(true);
  });

  it('handles action type HOME_GET_CLIENT_DATA_SUCCESS correctly', () => {
    const prevState = { getClientDataPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIENT_DATA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClientDataPending).toBe(false);
  });

  it('handles action type HOME_GET_CLIENT_DATA_FAILURE correctly', () => {
    const prevState = { getClientDataPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIENT_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClientDataPending).toBe(false);
    expect(state.getClientDataError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CLIENT_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { getClientDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIENT_DATA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClientDataError).toBe(null);
  });
});

