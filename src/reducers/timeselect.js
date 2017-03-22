import { createReducer } from "redux-act";
import R from "ramda";
import isToday from 'date-fns/is_today';
import endOfDay from 'date-fns/end_of_day';
import getYearsFns from "date-fns/get_year";
import getMonthsFns from "date-fns/get_month";
import getDateFns from "date-fns/get_date";
import getHoursFns from "date-fns/get_hours";
import getMinutesFns from "date-fns/get_minutes";
import endOfMonth from "date-fns/end_of_month";
import min from 'date-fns/min';
import isAfter from 'date-fns/is_after';
import endOfYesterday from 'date-fns/end_of_yesterday'
import { splitTime, addTime, formatTime } from "../libs/timeFunctions";
import { timeselectReset, timeselectChange, clockTick } from "../actions/";
import { DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES, PLUS, MINUS } from '../constants/';

function zeroPad(val) {return (val<10)?("0"+val):(val);}

const datefields = [DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES];
const directions = [PLUS, MINUS];
const monthsList=['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'];

const generateTimeselect = (selected, date) => {
      const now=new Date();
      const timestamp = date.valueOf();
      const limits = {
        [DAYS]: {
          first: (getDateFns(date) === 1 && getMonthsFns(date) === 0 && getYearsFns(date) === 2000),
          last: isAfter(date, endOfYesterday())
        },
        [DATE]: {
          first: (getDateFns(date) === 1),
          last: (getDateFns(endOfMonth(now)) === getDateFns(date))
        },
        [MONTHS]: {
          first: (getDateFns(date) === 0),
          last: (getDateFns(date) === 11)
        },
        [YEARS]: {
          first: (getYearsFns(date) === 2000),
          last: (getYearsFns(date) === getYearsFns(now))
        },
        [HOURS]: {
          first: (getHoursFns(date) === 0),
          last: (getHoursFns(date) === 23)
        },
        [MINUTES]: {
          first: (getMinutesFns(date) === 0),
          last: (getMinutesFns(date) === 59)
        }
      };
      let prev={};
      let next={};
        if (limits[DATE].first) {prev[DATE]="";} else {prev[DATE]=getDateFns(date)-1;};
        if (limits[DATE].last) {next[DATE]="";} else {next[DATE]=getDateFns(date)+1;};
        if (limits[YEARS].first) {prev[YEARS]="";} else {prev[YEARS]=getYearsFns(date)-1;};
        if (limits[YEARS].last) {next[YEARS]="";} else {next[YEARS]=getYearsFns(date)+1;};

        if (limits[MONTHS].first) {prev[MONTHS]="";} else {prev[MONTHS]=monthsList[getDateFns(date)-1];};
        if (limits[MONTHS].last) {next[MONTHS]="";} else {next[MONTHS]=monthsList[getMonthsFns(date)+1];};
        if (limits[HOURS].first) {prev[HOURS]="";} else {prev[HOURS]=zeroPad(getHoursFns(date)-1);};
        if (limits[HOURS].last) {next[HOURS]="";} else {next[HOURS]=zeroPad(getHoursFns(date)+1);};
        if (limits[MINUTES].first) {prev[MINUTES]="";} else {prev[MINUTES]=zeroPad(getMinutesFns(date)-1);};
        if (limits[MINUTES].last) {next[MINUTES]="";} else {next[MINUTES]=zeroPad(getMinutesFns(date)+1);};

      return {
        selected, timestamp, limits, prev, next
      };

    };

const changedTimeselect = (state, {period = DATE, direction = MINUS }) => {
  if (!R.contains(period, datefields)) {period = DATE;}
  if (!R.contains(direction, directions)) {direction = PLUS;}
  let oldm = new Date(state.timestamp);
  const delta = (direction === PLUS) ? 1 : -1;
  const limit = state.limits[period];
  const isAgainstLimits = (direction === PLUS) ? limit.last : limit.first;
  if (!isAgainstLimits) oldm=addTime(oldm, delta, period);
  const m = min(endOfDay(new Date()), oldm);
  return generateTimeselect(true, m);
};

const timeselect = createReducer(
  {
    [timeselectReset]: () => generateTimeselect(false, new Date()),
    [clockTick]: state => generateTimeselect(state.selected, (state.selected ? new Date(state.timestamp): new Date())),
    [timeselectChange]: (state, payload) => changedTimeselect(state, payload),
  },
  generateTimeselect(false, new Date())
  );
export default timeselect;

export const getLimits = state => state.limits;
export const getPrev = state => state.prev;
export const getNext = state => state.next;
export const getSelected = state => state.selected;
export const getParts = state => splitTime(state.timestamp);
export const isItToday = state => isToday(state.timestamp);
export const getString = state => formatTime(state.timestamp);

export const getDate = state => getDateFns(state.timestamp);
export const getMonths = state => getMonthsFns(state.timestamp);
export const getYears = state => getYearsFns(state.timestamp);
export const getMinutes = state => getMinutesFns(state.timestamp);
export const getHours = state => getHoursFns(state.timestamp);
