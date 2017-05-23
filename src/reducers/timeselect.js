import { combineReducers } from "redux";
import { createReducer } from "redux-act";
import min from "date-fns/min";
import endOfDay from "date-fns/end_of_day";
import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";

import {
  timeselectReset,
  timeselectChangeDay,
  timeselectChangeDate,
  timeselectChangeMonth,
  timeselectChangeYear,
  timeselectChangeMinute,
  timeselectChangeHour,
  timeselectSetTimestamp,
  timeselectShiftlengthIncrease,
  timeselectShiftlengthDecrease,
 } from "../actions/";

const selected = createReducer(
  {
    [timeselectReset]: () => false,
    [timeselectChangeDay]: () => true,
    [timeselectChangeDate]: () => true,
    [timeselectChangeMonth]: () => true,
    [timeselectChangeYear]: () => true,
    [timeselectChangeHour]: () => true,
    [timeselectChangeMinute]: () => true,
  }, false);

const toMaxTimestamp = date => min(endOfDay(new Date()), date).valueOf();

const timestamp = createReducer(
  {
    [timeselectSetTimestamp]: (state, {selected, newTimestamp}) => ( selected ? state : newTimestamp ),
    [timeselectChangeDay]: (state, delta) => toMaxTimestamp(addDays(state, delta)),
    [timeselectChangeDate]: (state, delta) => toMaxTimestamp(addDays(state, delta)),
    [timeselectChangeMonth]: (state, delta) => toMaxTimestamp(addMonths(state, delta)),
    [timeselectChangeYear]: (state, delta) => toMaxTimestamp(addYears(state, delta)),
    [timeselectChangeHour]: (state, delta) => toMaxTimestamp(addHours(state, delta)),
    [timeselectChangeMinute]: (state, delta) => toMaxTimestamp(addMinutes(state, delta)),
  },
  Date.now());

const currTimestamp = createReducer(
  {
    [timeselectSetTimestamp]: (state, {newTimestamp}) => newTimestamp,
  },
  Date.now()
);

const shiftlength = createReducer(
  {
    [timeselectShiftlengthIncrease]: state => ((state <= 11) ? state + 1 : state),
    [timeselectShiftlengthDecrease]: state => ((state >= 2) ? state - 1 : state),
  },
  8
);

const timeselect = combineReducers({
  selected,
  timestamp,
  currTimestamp,
  shiftlength,
});

export default timeselect;
