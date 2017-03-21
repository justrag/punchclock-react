import { createReducer } from "redux-act";
import isToday from 'date-fns/is_today';
import endOfDay from 'date-fns/end_of_day';
import min from 'date-fns/min';
import isAfter from 'date-fns/is_after';
import endOfYesterday from 'date-fns/end_of_yesterday'
import { displayNow, toObject, splitTime, addTime } from "../libs/timeFunctions";
import { timeselectReset, timeselectChanged, clockTick } from "../actions/";
import { DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES, PLUS, MINUS, dateFormats } from '../constants/';

function zeroPad(val) {return (val<10)?("0"+val):(val);}

const datefields = [DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES];
const directions = [PLUS, MINUS];
const monthsList=['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'];

const clockface = createReducer(
  {
    [timeselectReset]: () => generateClockface(false, new Date()),
    [clockTick]: state => generateClockface(state.selected, (state.selected ? new Date(state.timestamp): new Date())),
    [timeselectChanged]: (state, payload) => changedClockface(state, payload),
  },
  generateClockface(false, new Date())
  );
export default clockface;

const changedClockface = (state, payload) => {
  const dateField = R.contains(payload.dateField, datefields) ? payload.dateField : DATE;
  const direction = R.contains(payload.direction, directions) ? payload.direction : PLUS;
  let oldm = new Date(state.timestamp);
  const delta = (direction === PLUS) ? 1 : -1;
  const limit = state.limits[dateField];
  const isAgainstLimits = (direction === PLUS) ? limit.last : limit.first;
  if (!isAgainstLimits) oldm=addTime(oldm, delta, dateField);
  m = min(endOfDay(new Date()), oldm);
  return generateClockface(true, m);
};

const generateClockface(selected, date) => {
      const now=new Date();
      const timestamp = date.valueOf();
      const numericalDate = formatDate(date);
      const isItToday = isToday(date);
      const timeString = formatTime(date);
      const dates = toObject(date);
      const parts = splitTime(timestamp);
      const limits = {
        day: {
          first: (dates.date === 1 && dates.months === 0 && dates.year === 2000),
          last: isAfter(date, endOfYesterday())
        },
        date: {
          first: (dates.date === 1),
          last: (getDate(endOfMonth(now)) === dates.date)
        },
        months: {
          first: (dates.months === 0),
          last: (dates.months === 11)
        },
        years: {
          first: (dates.years === 2000),
          last: (dates.years === getYear(now))
        },
        hours: {
          first: (dates.hours === 0),
          last: (dates.hours === 23)
        },
        minutes: {
          first: (dates.minutes === 0),
          last: (dates.minutes === 59)
        }
      };
      let prev={};
      let next={};
      [DATE, YEARS].forEach(function(val) {
        if (limits[val].first) {prev[val]="";} else {prev[val]=dates[val]-1;};
        if (limits[val].last) {next[val]="";} else {next[val]=dates[val]+1;};
      });
        if (limits.months.first) {prev.months="";} else {prev.months=monthsList[dates.months-1];};
        if (limits.months.last) {next.months="";} else {next.months=monthsList[dates.months+1];};
        if (limits.hours.first) {prev.hours="";} else {prev.hours=zeroPad(dates.hours-1);};
        if (limits.hours.last) {next.hours="";} else {next.hours=zeroPad(dates.hours+1);};
        if (limits.minutes.first) {prev.minutes="";} else {prev.minutes=zeroPad(dates.minutes-1);};
        if (limits.minutes.last) {next.minutes="";} else {next.minutes=zeroPad(dates.minutes+1);};

      return {
        selected, timestamp, numericalDate, isItToday, timeString, utcOffset, dates, parts, limits, prev, next, notselected: !selected
      };

    });
