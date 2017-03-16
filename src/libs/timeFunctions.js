import R from "ramda";
import format from "date-fans/format";
import getMonth from "date-fns/get_month";
import getYear from "date-fns/get_year";
import startOfWeek from "date-fns/start_of_week";

/// FIXME: WHAT ABOUT UTC OFFSET???
///check every function that takes utcOffset as param

//export const formatDate = (timestamp, utcOffset=0) => moment(timestamp).utcOffset(utcOffset).format("YYYYMMDD");
export const formatDate = (timestamp, utcOffset = 0) =>
  format(new Date(timestamp), "YYYYMMDD");
//  const formatTime = (timestamp, utcOffset=0) => moment(timestamp).utcOffset(utcOffset).format("HH:mm:ss");
export const formatTime = (timestamp, utcOffset = 0) =>
  format(new Date(timestamp), "HH:mm");

export const splitTime = (timestamp, utcOffset = 0) => {
  let date = Date(timestamp);
  let formats = {
    day: "D",
    month: "MMM",
    year: "YYYY",
    hour: "HH",
    minute: "mm",
    second: "ss"
  };
  return R.map(val => format(date, val), formats);
};

export const todaysDate = () => format(new Date(), "YYYYMMDD");
export const hoursToMilliseconds = ms => ms * 3600000;

export const dateTimeStamp = (timestamp = Date.now(), utcOffset = 0) => {
  //let timestamp = Date.now();
  let date = formatDate(timestamp, utcOffset);
  let time = formatTime(timestamp, utcOffset);
  return {
    timestamp,
    date,
    time
  };
};

export const fromMsToHrsMinsSecs = duration => format(duration, "HH:mm:ss");
export const fromMsToHrsMins = duration => format(duration, "HH:mm");

export const diffTimestamp = (begin, end, length) =>
  end - begin - hoursToMilliseconds(length);

export const formatDiffTimestamp = timestamp => {
  let prefix = timestamp < 0 ? "-" : "+";
  return prefix + fromMsToHrsMins(Math.abs(timestamp));
};

//export const firstDayOfTheWeek = (timestamp) => moment(timestamp).startOf('week').format("YYYYMMDD");
export const firstDayOfTheWeek = timestamp =>
  format(startOfWeek(new Date(timestamp)), "YYYYMMDD");
//export const firstDayOfTheMonth = (timestamp) => moment(timestamp).startOf('month').format("YYYYMMDD");
export const firstDayOfTheMonth = timestamp =>
  format(
    new Date(getYear(new Date(timestamp)), getMonth(new Date(timestamp)), 1),
    "YYYYMMDD"
  );
//export const firstDayOfTheYear = (timestamp) => moment(timestamp).startOf('year').format("YYYYMMDD");
export const firstDayOfTheYear = timestamp =>
  format(new Date(getYear(new Date(timestamp)), 0, 1), "YYYYMMDD");
