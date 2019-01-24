import initialState from './initialState';
import { reducer as turnOnLoadingReducer } from './turnOnLoading';
import { reducer as turnOffLoadingReducer } from './turnOffLoading';
import { reducer as turnOffErrorReducer } from './turnOffError';
import { reducer as turnOnErrorReducer } from './turnOnError';

const reducers = [
  turnOnLoadingReducer,
  turnOffLoadingReducer,
  turnOffErrorReducer,
  turnOnErrorReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
