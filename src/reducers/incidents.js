import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import R from "ramda";
import { fetchIncidentSuccess, fetchIncidentFailure } from '../actions/';
import { formatDate } from "../libs/timeFunctions";
import { FETCH, SAVE, UPDATE , REQUEST, FAILURE, SUCCESS } from '../constants/'; 

const data = (state = {}, action}) => {
  switch (action.type) {
    case 'INCIDENT_FETCH_REQUEST' || 'INCIDENT_SAVE_REQUEST' || 'INCIDENT_UPDATE_REQUEST':
      return { ...state, request: true };
    case 'INCIDENT_FETCH_SUCCESS' || 'INCIDENT_SAVE_SUCCESS' || 'INCIDENT_UPDATE_SUCCESS':
      return R.compose(
      R.assocPath([action.payload.date, 'request'], false),
      R.assocPath([action.payload.date, 'enter'], new Date(`${action.payload.date} ${action.payload.enter}`).valueOf()),
      R.assocPath([action.payload.date, 'exit'], new Date(`${action.payload.date} ${action.payload.exit}`).valueOf()),  // CHECKME: null?
      R.assocPath([action.payload.date, 'shiftlength'], action.payload.shiftlength),
    )(state);
    case 'INCIDENT_FETCH_FAILURE' || 'INCIDENT_SAVE_FAILURE' || 'INCIDENT_UPDATE_FAILURE':
      return R.dissoc(action.payload.date, state);
    default:
      return state;
  };
};
const ids = (state = [], action}) => {
  switch (action.type) {
    case 'INCIDENT_FETCH_REQUEST' || 'INCIDENT_SAVE_REQUEST' || 'INCIDENT_UPDATE_REQUEST':
      return R.uniq([...state, action.payload.date]);
    case 'INCIDENT_FETCH_SUCCESS' || 'INCIDENT_SAVE_SUCCESS' || 'INCIDENT_UPDATE_SUCCESS':
      return R.uniq([...state, action.payload.date]);
    case 'INCIDENT_FETCH_FAILURE' || 'INCIDENT_SAVE_FAILURE' || 'INCIDENT_UPDATE_FAILURE':
      return R.reject(R.equals(action.payload.date),state);
    default:
      return state;
  };
};

const incidents = combineReducers({ids, data});
export default incidents;

export const getEnterOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'exit'], state);
export const getShiftlengthOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'shiftlength'], state);
