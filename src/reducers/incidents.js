import { combineReducers } from 'redux';
import R from "ramda";

const request = (state = false, action) => {
  if (action.api) {
    if (action.api.request) {
      return action.api.request;
    }
    if (action.api.data || action.api.error) {
      return false;
    }
  }
  return state;
};

const error = (state = false, action) => {
  if (action.api) {
    if (action.api.error) {
      return action.api.error;
    }
    if (action.api.request || action.api.data) {
      return false;
    }
  }
  return state;
};

const data = (state = {}, action) => {
  if (action.api && action.api.data && action.api.data[0]) {
    return ({...state, [action.api.data[0].date]: {...state[action.api.data[0].date], ...action.api.data[0]}});
  } else {
    return state;
  }
}

const ids = (state = [], action) => {
  if (action.api && action.api.data && action.api.data[0]) {
    return R.uniq([...state, action.api.data[0].date]);
  }
  return state;
};

const incidents = combineReducers({request, error, ids, data});
export default incidents;
