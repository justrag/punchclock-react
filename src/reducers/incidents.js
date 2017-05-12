import { combineReducers } from 'redux';
import R from "ramda";
import {
  FETCH, SAVE, UPDATE,
  INCIDENT_FETCH_REQUEST, INCIDENT_FETCH_FAILURE, INCIDENT_FETCH_SUCCESS,
  INCIDENT_SAVE_REQUEST, INCIDENT_SAVE_FAILURE, INCIDENT_SAVE_SUCCESS,
  INCIDENT_UPDATE_REQUEST, INCIDENT_UPDATE_FAILURE, INCIDENT_UPDATE_SUCCESS
} from '../constants/';

const request = (state = false, action) => {
  switch(action.type) {
    case INCIDENT_FETCH_REQUEST:
      return FETCH;
    case INCIDENT_SAVE_REQUEST:
      return SAVE;
    case INCIDENT_UPDATE_REQUEST:
      return UPDATE;
    case INCIDENT_FETCH_SUCCESS || INCIDENT_SAVE_SUCCESS || INCIDENT_UPDATE_SUCCESS || INCIDENT_FETCH_FAILURE || INCIDENT_SAVE_FAILURE || INCIDENT_UPDATE_FAILURE:
      return false;
    default:
      return state;
  }
};

const error = (state = false, action) => {
  switch(action.type) {
    case INCIDENT_FETCH_FAILURE || INCIDENT_SAVE_FAILURE || INCIDENT_UPDATE_FAILURE:
      return action.error.message;
    case INCIDENT_FETCH_SUCCESS || INCIDENT_SAVE_SUCCESS || INCIDENT_UPDATE_SUCCESS || INCIDENT_FETCH_REQUEST || INCIDENT_SAVE_REQUEST || INCIDENT_UPDATE_REQUEST:
      return false;
    default:
      return state;
  }
};

const data = (state = {}, action) => {
  if (action.payload &&
    [INCIDENT_FETCH_SUCCESS,INCIDENT_SAVE_SUCCESS,INCIDENT_UPDATE_SUCCESS].includes(action.type)) {
      return R.compose(
      R.assocPath([action.payload.date, 'enter'], new Date(`${action.payload.date} ${action.payload.enter}`).valueOf()),
      R.assocPath([action.payload.date, 'exit'], new Date(`${action.payload.date} ${action.payload.exit}`).valueOf()),  // CHECKME: null?
      R.assocPath([action.payload.date, 'shiftlength'], action.payload.shiftlength),
    )(state);
  };
  return state;
};

const ids = (state = [], action) => {
 if (action.payload &&
    [INCIDENT_FETCH_SUCCESS,INCIDENT_SAVE_SUCCESS,INCIDENT_UPDATE_SUCCESS].includes(action.type)) {
      return R.uniq([...state, action.payload.date]);
  };
      return state;
};

const incidents = combineReducers({request, error, ids, data});
export default incidents;

export const getEnterOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'exit'], state);
export const getShiftlengthOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'shiftlength'], state);
