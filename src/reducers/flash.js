import { combineReducers } from 'redux';
import R from 'ramda';
import { FLASH_ADD, FLASH_REMOVE } from '../constants/';

const data = (state = {}, action) => {
  switch (action.type) {
    case FLASH_ADD:
      return { ...state, [action.payload.id]: action.payload };
    case FLASH_REMOVE:
      return R.dissoc(action.payload.id, state);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FLASH_ADD:
      return [...state, action.payload.id];
    case FLASH_REMOVE:
      return R.without([action.payload.id], state);
    default:
      return state;
  }
};

const flash = combineReducers({ ids, data });
export default flash;
