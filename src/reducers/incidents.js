import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import R from "ramda";
import { fetchIncidentSuccess, fetchIncidentFailure } from '../actions/';
import { formatDate } from "../libs/timeFunctions";

const ids = createReducer({
  [fetchIncidentRequest]: (state, {date}) => R.uniq([...state, date]),
  [fetchIncidentFailure]: (state, {date}) => R.reject(R.equals(date),state),
  [saveIncidentRequest]: (state, {date}) => R.uniq([...state, date]),
  [saveIncidentFailure]: (state, {date}) => state, // WHAT TO DO HERE???
}, []);
const data = createReducer({
  [fetchIncidentRequest]: (state, {date}) => R.assocPath([date, 'fetching'], true, state),
  [fetchIncidentFailure]: (state, {date}) => R.reject(R.equals(date),state),
  [fetchIncidentSuccess]: (state, {date, enter, exit, shiftlength}) =>
    R.compose(
      R.assocPath([date, 'fetching'], false),
      R.assocPath([date, 'enter'], new Date(`${date} ${enter}`).valueOf()),
      R.assocPath([date, 'exit'], new Date(`${date} ${exit}`).valueOf()),  // CHECKME: null?
      R.assocPath([date, 'shiftlength'], shiftlength),
    )(state),
  [saveIncidentRequest]: (state, {date}) => R.assocPath([date, 'saving'], true, state),
  [saveIncidentFailure]: (state, {date}) => state, //WHAT TO DO HERE???
  [saveIncidentSuccess]: (state, {date, enter, shiftlength}) =>
    R.compose(
      R.assocPath([date, 'saving'], false),
      R.assocPath([date, 'enter'], new Date(`${date} ${enter}`).valueOf()),
      R.assocPath([date, 'shiftlength'], shiftlength),
    )(state),
}, {});

/*
fetch
  request: { status: fetch, error: false }
  failure: { status: ready, error: fetch }
  success: { status: ready, error: false, ...data }
save
  request: { status: save, error: false }
  failure: { status: ready, error: save }
  success: { status: ready, error: false, ...data }
update
  request: { status: update, error: false }
  failure: { status: ready, error: update }
  success: { status: ready, error: false, ...data }
*/

const incidents = combineReducers({ids, data});
export default incidents;

export const getEnterOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'exit'], state);
export const getShiftlengthOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'shiftlength'], state);
