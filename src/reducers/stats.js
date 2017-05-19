import { combineReducers } from 'redux';
import R from 'ramda';
import endOfWeek from "date-fns/end_of_week";
import endOfMonth from "date-fns/end_of_month";
import endOfYear from "date-fns/end_of_year";
import startOfWeek from "date-fns/start_of_week";
import startOfMonth from "date-fns/start_of_month";
import startOfYear from "date-fns/start_of_year";
import addWeeks from "date-fns/add_weeks";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import {WEEK, MONTH, YEAR} from '../constants/';
import {statsReset} from '../actions/';
import {formatDate} from '../libs/timeFunctions';

const slide = period => (state = 0, action) => {
  if (action.type === statsReset.getType()) {
    return 0;
  }
  if (action.stats && action.stats.delta && action.stats.period === period) {
    return Math.min(state + action.stats.delta, 0);
  }
  return state;
}

const loading = period => (state = false, action) => {
  if (action.stats && action.stats.period === period) {
    return !!action.stats.request;
  }
  return state;  
}

const error = period => (state = false, action) => {
  if (action.stats && action.stats.period === period) {
    return !!action.stats.error;
  }
  return state;  
}

const data = period => (state = {}, action) => {
  if (action.stats && action.stats.data && action.stats.period === period) {
    return action.stats.data;
  }
  return state;
}

const stats = combineReducers(
  R.map(p =>
    combineReducers({
      loading: loading(p),
      data: data(p),
      error: error(p),
      slide: slide(p)
    }), {week: WEEK, month: MONTH, year: YEAR})
);

export default stats;

const pt = {
  [WEEK]:  {i: "week",  af: addWeeks,  sf: endOfWeek,  ef: endOfWeek, o: {weekStartsOn: 1}},
  [MONTH]: {i: "month", af: addMonths, sf: endOfMonth, ef: endOfMonth, o: {}},
  [YEAR]:  {i: "year",  af: addYears,  sf: endOfYear,  ef: endOfYear, o: {}}
};

export const getBegin = (state, period) => {
  const delta = state[pt[period].i].slide;
  const addPeriod = pt[period].af;
  const startOfPeriod = pt[period].sf;
  const day = addPeriod(new Date(), delta);
  return formatDate(startOfPeriod(day, pt[period].o));
}
export const getEnd = (state, period) => {
  const delta = state[pt[period].i].slide;
  const addPeriod = pt[period].af;
  const endOfPeriod = pt[period].ef;
  const day = addPeriod(new Date(), delta);
  return formatDate(endOfPeriod(day, pt[period].o));
}

/*
export const getWeekBegin = state => {
  const delta = state.week.slide;
  const day = addWeeks(new Date(), delta);
  return formatDate(startOfWeek(day, {weekStartsOn: 1}));
}
export const getWeekEnd = state => {
  const delta = state.week.slide;
  const day = addWeeks(new Date(), delta);
  return formatDate(endOfWeek(day, {weekStartsOn: 1}));
}
export const getMonthBegin = state => {
  const delta = state.month.slide;
  const day = addMonths(new Date(), delta);
  return formatDate(startOfMonth(day));
}
export const getMonthEnd = state => {
  const delta = state.month.slide;
  const day = addMonths(new Date(), delta);
  return formatDate(endOfMonth(day));
}
export const getYearBegin = state => {
  const delta = state.year.slide;
  const day = addYears(new Date(), delta);
  return formatDate(startOfYear(day));
}
export const getYearEnd = state => {
  const delta = state.year.slide;
  const day = addYears(new Date(), delta);
  return formatDate(endOfYear(day));
}
*/