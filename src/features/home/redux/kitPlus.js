// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_KIT_PLUS,
} from './constants';

export function kitPlus(kit, box) {
  let id = kit.kit_id
  return {
    type: HOME_KIT_PLUS,
    kit,
    box,
    id,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_KIT_PLUS:
    let kits = state.kits;
    let myBoxKits = state.myBoxKits
    kits["kit" + action.id] =  action.kit;
    myBoxKits["myBoxKit" + action.id] = action.box;
      return {
        ...state,
        kits,
        myBoxKits,
      };

    default:
      return state;
  }
}
