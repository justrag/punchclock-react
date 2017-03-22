import R from "ramda";
import plLocale from "date-fns/locale/pl";
import format from "date-fns/format";
import startOfWeek from "date-fns/start_of_week";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";
import { DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES, dateFormats } from '../constants/';

export const formatDate = timestamp => format(timestamp, "YYYYMMDD");
export const formatTime = timestamp => format(timestamp, "HH:mm");

export const splitTime = timestamp =>
  R.map(spec => format(timestamp, spec, {locale: plLocale}), dateFormats);

export const todaysDate = () => formatDate(new Date());
export const hoursToMilliseconds = ms => ms * 3600000;

export const dateTimeStamp = (timestamp = Date.now()) => ({
  timestamp,
  date: formatDate(timestamp),
  time: formatTime(timestamp)
});

export const displayNow = () => {
  const now = new Date();
  return ({
    timestamp: now.valueOf(),
    display: format(now, "ddd D MMM YYYY, HH:mm:ss", {locale: plLocale}),
  });
};

export const fromMsToHrsMinsSecs = duration => format(duration, "HH:mm:ss");
export const fromMsToHrsMins = duration => format(duration, "HH:mm");

export const diffTimestamp = (begin, end, length) =>
  end - begin - hoursToMilliseconds(length);

export const formatDiffTimestamp = timestamp => {
  let prefix = timestamp < 0 ? "-" : "+";
  return prefix + fromMsToHrsMins(Math.abs(timestamp));
};

export const firstDayOfTheWeek = timestamp =>
  formatDate(startOfWeek(timestamp));
export const firstDayOfTheMonth = timestamp =>
  formatDate(new Date(getYear(timestamp), getMonth(timestamp), 1));
export const firstDayOfTheYear = timestamp =>
  formatDate(new Date(getYear(timestamp), 0, 1));

/*
export const toObject = timestamp => ({
  [YEARS]: getYear(timestamp),
  [MONTHS]: getMonth(timestamp),
  [DATE]: getDate(timestamp),
  [HOURS]: getHours(timestamp),
  [MINUTES]: getMinutes(timestamp),
});
*/

export const addTime = (timestamp, delta, unit) => {
  switch(unit) {
    case DATE:
    case DAYS: return addDays(timestamp, delta);
    case MONTHS: return addMonths(timestamp, delta);
    case YEARS: return addYears(timestamp, delta);
    case HOURS: return addHours(timestamp, delta);
    case MINUTES: return addMinutes(timestamp, delta);
    default: return new Date(timestamp);
  }; // eslint-disable-line no-unreachable
};
