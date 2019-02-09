// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_KIT_MINUS,
} from './constants';

export function kitMinus(kit, box) {
  let id = kit.kit_id
  return {
    type: HOME_KIT_MINUS,
    kit,
    box,
    id,
  };
}

export function reducer(state, action) {

  switch (action.type) {
    case HOME_KIT_MINUS:
      let kits = state.kits;
      let myBoxKits = state.myBoxKits;
      kits["kit" + action.id] =  action.kit;
      myBoxKits["myBoxKit" + action.id] = action.kit;
      return {
        ...state,
        kits,
        myBoxKits,
      };

    default:
      return state;
  }
}