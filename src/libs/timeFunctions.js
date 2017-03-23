import format from "date-fns/format";
import startOfWeek from "date-fns/start_of_week";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";

export const formatDate = timestamp => format(timestamp, "YYYYMMDD");
export const formatTime = timestamp => format(timestamp, "HH:mm");

export const todaysDate = () => formatDate(new Date());
export const hoursToMilliseconds = ms => ms * 3600000;

export const fromMsToHrsMinsSecs = duration => format(duration, "HH:mm:ss");
export const fromMsToHrsMins = duration => format(duration, "HH:mm");


export const firstDayOfTheWeek = timestamp =>
  formatDate(startOfWeek(timestamp));
export const firstDayOfTheMonth = timestamp =>
  formatDate(new Date(getYear(timestamp), getMonth(timestamp), 1));
export const firstDayOfTheYear = timestamp =>
  formatDate(new Date(getYear(timestamp), 0, 1));


export const diffTimestamp = (begin, end, length) =>
  end - begin - hoursToMilliseconds(length);

export const formatDiffTimestamp = timestamp => {
  let prefix = timestamp < 0 ? "-" : "+";
  return prefix + fromMsToHrsMins(Math.abs(timestamp));
};
/*
      let exitStamp = TF.dateTimeStamp(timestamp, utcOffset);
      let diffStamp = TF.diffTimestamp(today.enter.timestamp, exitStamp.timestamp, shiftLength);
      let diffTime = TF.formatDiffTimestamp(diffStamp);
                work: {timestamp: diffStamp, time: diffTime}
*/