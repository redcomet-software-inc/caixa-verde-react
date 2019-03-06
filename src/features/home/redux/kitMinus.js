// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_KIT_MINUS,
} from './constants';
import { count } from  '../../../features/home/local-actions';

export function kitMinus(kit, box) {
  let id = kit.kit_id
  return {
    type: HOME_KIT_MINUS,
    kit,
    count,
    box,
    id,
  };
}

export function reducer(state, action) {

  switch (action.type) {
    case HOME_KIT_MINUS:
      let selected_kits = state.selected_kits;
      let myBoxKits = state.myBoxKits;
      selected_kits["kit" + action.id] =  action.kit;
      myBoxKits["myBoxKit" + action.id] = action.kit;
      let count = action.count(state.selected_products, selected_kits);
      return {
        ...state,
        selected_kits,
        myBoxKits,
        count,
      };

    default:
      return state;
  }
}
