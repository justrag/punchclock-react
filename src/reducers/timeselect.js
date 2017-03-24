import { combineReducers } from "redux";
import { createReducer } from "redux-act";
import isToday from 'date-fns/is_today';
import getYearsFns from "date-fns/get_year";
import getMonthsFns from "date-fns/get_month";
import getDateFns from "date-fns/get_date";
import getHoursFns from "date-fns/get_hours";
import getMinutesFns from "date-fns/get_minutes";
import min from "date-fns/min";
import endOfDay from "date-fns/end_of_day";
import endOfMonth from "date-fns/end_of_month";
import endOfYesterday from 'date-fns/end_of_yesterday'
import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";
import isAfter from 'date-fns/is_after';
import plLocale from "date-fns/locale/pl";
import format from "date-fns/format";
import { formatTime, zeroPad } from "../libs/timeFunctions";
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

const monthsList=['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'];

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

export const getDisplay = state => format(state.currTimestamp, "ddd D MMM YYYY, HH:mm:ss", {locale: plLocale});
export const getShiftlength = state => state.shiftlength;

export const getTimestamp = state => state.timestamp;
export const getCurrentTimestamp = state => state.currTimestamp;
export const getSelected = state => state.selected;
export const isItToday = state => isToday(state.timestamp);
export const getTimestring = state => formatTime(state.timestamp);

export const getDate = state => getDateFns(state.timestamp);
export const getMonths = state => monthsList[getMonthsFns(state.timestamp)];
export const getYears = state => getYearsFns(state.timestamp);
export const getMinutes = state => zeroPad(getMinutesFns(state.timestamp));
export const getHours = state => zeroPad(getHoursFns(state.timestamp));

export const isFirstDay = ({timestamp}) => 
 (getDateFns(timestamp) === 1 && getMonthsFns(timestamp) === 0 && getYearsFns(timestamp) === 2000);
export const isLastDay = ({timestamp}) => isAfter(timestamp, endOfYesterday());
export const getPrevDate = ({timestamp}) =>
  ((getDateFns(timestamp) !== 1) && (getDateFns(timestamp)-1));
export const getNextDate = ({timestamp}) =>
  ( (getDateFns(timestamp) !== getDateFns(endOfMonth(Date.now()))) && (getDateFns(timestamp)+1) );
export const getPrevMonth = ({timestamp}) =>
( (getMonthsFns(timestamp) !== 0) && (monthsList[getMonthsFns(timestamp)-1]) );
export const getNextMonth = ({timestamp}) =>
( (getMonthsFns(timestamp) !== 11) && (monthsList[getMonthsFns(timestamp)+1]) );
export const getPrevYear = ({timestamp}) =>
  ((getYearsFns(timestamp) !== 2000) && (getYearsFns(timestamp)-1));
export const getNextYear = ({timestamp}) => 
( (getYearsFns(timestamp) !== getYearsFns(Date.now())) && (getYearsFns(timestamp)+1) );
export const getPrevHour = ({timestamp}) =>
( (getHoursFns(timestamp) !== 0) && (zeroPad(getHoursFns(timestamp)-1)) );
export const getNextHour = ({timestamp}) =>
( (getHoursFns(timestamp) !== 23) && (zeroPad(getHoursFns(timestamp)+1)) );
export const getPrevMinute = ({timestamp}) =>
( (getMinutesFns(timestamp) !== 0) && (zeroPad(getMinutesFns(timestamp)-1)) );
export const getNextMinute = ({timestamp}) =>
( (getMinutesFns(timestamp) !== 59) && (zeroPad(getMinutesFns(timestamp)+1)) );
