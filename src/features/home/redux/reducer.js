import initialState from './initialState';
import { reducer as turnOnLoadingReducer } from './turnOnLoading';
import { reducer as turnOffLoadingReducer } from './turnOffLoading';
import { reducer as turnOffErrorReducer } from './turnOffError';
import { reducer as turnOnErrorReducer } from './turnOnError';
import { reducer as redirectReducer } from './redirect';
import { reducer as resetRedirectReducer } from './resetRedirect';
import { reducer as productPlusReducer } from './productPlus';
import { reducer as productMinusReducer } from './productMinus';
import { reducer as kitPlusReducer } from './kitPlus';
import { reducer as kitMinusReducer } from './kitMinus';
import { reducer as getClientDataReducer } from './getClientData';
import { reducer as getMinQuantityRequestReducer } from './getMinQuantityRequest';
import { reducer as resetReducer } from './reset';
import { reducer as clearBoxReducer } from './clearBox';
import { reducer as getOrderPriceReducer } from './getOrderPrice';
import { reducer as setSignInReducer } from './setSignIn';
import { reducer as productsReducer } from './products';
import { reducer as kitsReducer } from './kits';
import { reducer as turnOffSignInReducer } from './turnOffSignIn';

const reducers = [
  turnOnLoadingReducer,
  turnOffLoadingReducer,
  turnOffErrorReducer,
  turnOnErrorReducer,
  redirectReducer,
  resetRedirectReducer,
  productPlusReducer,
  productMinusReducer,
  kitPlusReducer,
  kitMinusReducer,
  getClientDataReducer,
  getMinQuantityRequestReducer,
  resetReducer,
  clearBoxReducer,
  getOrderPriceReducer,
  setSignInReducer,
  productsReducer,
  kitsReducer,
  turnOffSignInReducer,
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
