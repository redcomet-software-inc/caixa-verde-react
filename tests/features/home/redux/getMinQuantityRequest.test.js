import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MIN_QUANTITY_REQUEST_BEGIN,
  HOME_GET_MIN_QUANTITY_REQUEST_SUCCESS,
  HOME_GET_MIN_QUANTITY_REQUEST_FAILURE,
  HOME_GET_MIN_QUANTITY_REQUEST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMinQuantityRequest,
  dismissGetMinQuantityRequestError,
  reducer,
} from '../../../../src/features/home/redux/getMinQuantityRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMinQuantityRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMinQuantityRequest succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMinQuantityRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MIN_QUANTITY_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MIN_QUANTITY_REQUEST_SUCCESS);
      });
  });

  it('dispatches failure action when getMinQuantityRequest fails', () => {
    const store = mockStore({});

    return store.dispatch(getMinQuantityRequest({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MIN_QUANTITY_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MIN_QUANTITY_REQUEST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMinQuantityRequestError', () => {
    const expectedAction = {
      type: HOME_GET_MIN_QUANTITY_REQUEST_DISMISS_ERROR,
    };
    expect(dismissGetMinQuantityRequestError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MIN_QUANTITY_REQUEST_BEGIN correctly', () => {
    const prevState = { getMinQuantityPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MIN_QUANTITY_REQUEST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMinQuantityPending).toBe(true);
  });

  it('handles action type HOME_GET_MIN_QUANTITY_REQUEST_SUCCESS correctly', () => {
    const prevState = { getMinQuantityPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MIN_QUANTITY_REQUEST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMinQuantityPending).toBe(false);
  });

  it('handles action type HOME_GET_MIN_QUANTITY_REQUEST_FAILURE correctly', () => {
    const prevState = { getMinQuantityPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MIN_QUANTITY_REQUEST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMinQuantityPending).toBe(false);
    expect(state.getMinQuantityError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MIN_QUANTITY_REQUEST_DISMISS_ERROR correctly', () => {
    const prevState = { getMinQuantityError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MIN_QUANTITY_REQUEST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMinQuantityError).toBe(null);
  });
});

