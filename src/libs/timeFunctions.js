import R from "ramda";
import format from "date-fns/format";
import startOfWeek from "date-fns/start_of_week";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import getDate from "date-fns/get_date";
import getHours from "date-fns/get_hours";
import getMinutes from "date-fns/get_minutes";
import getSeconds from "date-fns/get_seconds";
import getMilliseconds from "date-fns/get_milliseconds";
import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import addYears from "date-fns/add_years";
import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";
import { DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES, PLUS, MINUS, dateFormats } from '../constants/';

export const formatDate = timestamp => format(timestamp, "YYYYMMDD");
export const formatTime = timestamp => format(timestamp, "HH:mm");

export const splitTime = timestamp =>
  R.map(spec => format(timestamp, spec), dateFormats);

export const todaysDate = () => formatDate(new Date());
export const hoursToMilliseconds = ms => ms * 3600000;

export const dateTimeStamp = (timestamp = Date.now()) => ({
  timestamp,
  date: formatDate(timestamp, utcOffset),
  time: formatTime(timestamp, utcOffset)
});

export const displayNow = () => {
  const now = new Date();
  return ({
    timestamp: now.valueOf(),
    display: format(now, "ddd, D MMM YYYY, HH:mm:ss"),
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

export const toObject = timestamp => ({
  [YEARS]: getYear(timestamp),
  [MONTHS]: getMonth(timestamp),
  [DATE]: getDate(timestamp),
  [HOURS]: getHours(timestamp),
  [MINUTES]: getMinutes(timestamp),
  [SECONDS]: getSeconds(timestamp),
  [MILLISECONDS]: getMilliseconds(timestamp),
});

export const addTime = (timestamp, delta, unit) => {
  switch(unit) {
    DATE:
    DAYS: return addDays(timestamp, delta);
    MONTHS: return addMonths(timestamp, delta);
    YEARS: return addYears(timestamp, delta);
    HOURS: return addHours(timestamp, delta);
    MINUTES: return addMinutes(timestamp, delta);
    default: return new Date(timestamp);
  };
};
