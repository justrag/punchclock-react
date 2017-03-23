import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import R from "ramda";
import { incidentSetEnter, incidentSetExit } from '../actions/'

const ids = createReducer({
  [incidentSetEnter]: (state, {timestamp, numericalDate}) => R.uniq([...state, numericalDate]),
}, []);
const data = createReducer({
  [incidentSetEnter]: (state, {timestamp, numericalDate}) => R.assocPath([numericalDate, 'enter'], timestamp, state),
  [incidentSetExit]: (state, {timestamp, numericalDate}) => R.assocPath([numericalDate, 'exit'], timestamp, state),
}, {});

const incidents = combineReducers({ids, data});
export default incidents;

export const getEnterOnDate = (state, numericalDate) => R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) => R.path(['data', numericalDate, 'exit'], state);
