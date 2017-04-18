import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import R from "ramda";
import { incidentSetEnter, incidentSetExit, incidentSuccess } from '../actions/';
import { formatDate } from "../libs/timeFunctions";

const ids = createReducer({
  [incidentSuccess]: (state, {date}) => R.uniq([...state, date]),
  [incidentSetEnter]: (state, {timestamp}) => R.uniq([...state, formatDate(timestamp)]),
}, []);
const data = createReducer({
  [incidentSuccess]: (state, {date, enter}) => R.assocPath([date, 'enter'], new Date(`${date} ${enter}`).valueOf(), state),
  [incidentSetEnter]: (state, {timestamp}) => R.assocPath([formatDate(timestamp), 'enter'], timestamp, state),
  [incidentSetExit]: (state, {timestamp, shiftLength}) =>
  R.compose(
    R.assocPath([formatDate(timestamp), 'exit'], timestamp),
    R.assocPath([formatDate(timestamp), 'shiftlength'], shiftLength)
    )(state),
}, {});

const incidents = combineReducers({ids, data});
export default incidents;

export const getEnterOnDate = (state, numericalDate) => R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) => R.path(['data', numericalDate, 'exit'], state);
export const getShiftlengthOnDate = (state, numericalDate) => R.path(['data', numericalDate, 'shiftlength'], state);
