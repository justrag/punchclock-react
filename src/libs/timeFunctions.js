import format from "date-fns/format";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import differenceInHours from 'date-fns/difference_in_hours';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import addWeeks from "date-fns/add_weeks";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import endOfWeek from "date-fns/end_of_week";
import endOfMonth from "date-fns/end_of_month";
import endOfYear from "date-fns/end_of_year";
import startOfWeek from "date-fns/start_of_week";
import startOfMonth from "date-fns/start_of_month";
import startOfYear from "date-fns/start_of_year";
import {WEEK, MONTH, YEAR} from "../constants/";

export const zeroPad = val => ( (val<10) ? `0${val}` : `${val}` );

export const formatMinutes = mins => `${Math.floor(mins/60)}:${zeroPad(mins%60)}`;

export const formatDate = timestamp => format(timestamp, "YYYY-MM-DD");
export const formatTime = timestamp => format(timestamp, "HH:mm");

export const todaysDate = () => formatDate(new Date());

export const firstDayOfTheWeek = timestamp =>
  formatDate(startOfWeek(timestamp));
export const firstDayOfTheMonth = timestamp =>
  formatDate(new Date(getYear(timestamp), getMonth(timestamp), 1));
export const firstDayOfTheYear = timestamp =>
  formatDate(new Date(getYear(timestamp), 0, 1));

export const absDifferenceInTimestamps = (ts1, ts2, printSeconds = false) => {
  const hrs = zeroPad(Math.abs(differenceInHours(ts1,ts2)));
  const mins = zeroPad(Math.abs(differenceInMinutes(ts1,ts2))%60);
  if (printSeconds) {
    const secs = zeroPad(Math.abs(differenceInSeconds(ts1,ts2))%60);
    return `${hrs}:${mins}:${secs}`;
    }
  return `${hrs}:${mins}`;
}

export const formatDifferenceInTimestamps = (ts1, ts2, printSeconds = false) => {
  const hrs = zeroPad(Math.abs(differenceInHours(ts1,ts2)));
  const mins = zeroPad(Math.abs(differenceInMinutes(ts1,ts2))%60);
  const sign = (ts2 > ts1) ? "+" : "-";
  if (printSeconds) {
    const secs = zeroPad(Math.abs(differenceInSeconds(ts1,ts2))%60);
    return `${sign}${hrs}:${mins}:${secs}`;
  }
  return `${sign}${hrs}:${mins}`;
};

export const weeksAgo = delta => {
  const day = addWeeks(new Date(), delta);
  const weekBegin = startOfWeek(day, {weekStartsOn: 1});
  const weekEnd = endOfWeek(day, {weekStartsOn: 1});
  return `${formatDate(weekBegin)} - ${formatDate(weekEnd)}`;
}
export const monthsAgo = delta => format(addMonths(new Date(), delta),"MMMM YYYY");
export const yearsAgo = delta => format(addYears(new Date(), delta),"YYYY");

const pt = {
  [WEEK]:  {i: "week",  af: addWeeks,  sf: startOfWeek,  ef: endOfWeek, o: {weekStartsOn: 1}},
  [MONTH]: {i: "month", af: addMonths, sf: startOfMonth, ef: endOfMonth, o: {}},
  [YEAR]:  {i: "year",  af: addYears,  sf: startOfYear,  ef: endOfYear, o: {}}
};

export const getPeriodBegin = (period, delta) => {
  const addPeriod = pt[period].af;
  const startOfPeriod = pt[period].sf;
  const day = addPeriod(new Date(), delta);
  return formatDate(startOfPeriod(day, pt[period].o));
}
export const getPeriodEnd = (period, delta) => {
  const addPeriod = pt[period].af;
  const endOfPeriod = pt[period].ef;
  const day = addPeriod(new Date(), delta);
  return formatDate(endOfPeriod(day, pt[period].o));
}
