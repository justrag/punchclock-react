import format from "date-fns/format";
import startOfWeek from "date-fns/start_of_week";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import differenceInHours from 'date-fns/difference_in_hours';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';

export const zeroPad = val => ( (val<10) ? `0${val}` : `${val}` );

export const formatDate = timestamp => format(timestamp, "YYYYMMDD");
export const formatTime = timestamp => format(timestamp, "HH:mm");

export const todaysDate = () => formatDate(new Date());

export const firstDayOfTheWeek = timestamp =>
  formatDate(startOfWeek(timestamp));
export const firstDayOfTheMonth = timestamp =>
  formatDate(new Date(getYear(timestamp), getMonth(timestamp), 1));
export const firstDayOfTheYear = timestamp =>
  formatDate(new Date(getYear(timestamp), 0, 1));

/*
export const hoursToMilliseconds = ms => ms * 3600000;
export const fromMsToHrsMinsSecs = duration => format(duration, "HH:mm:ss");
export const fromMsToHrsMins = duration => format(duration, "HH:mm");

export const diffTimestamp = (begin, end, length) =>
  end - begin - hoursToMilliseconds(length);

export const formatDiffTimestamp = timestamp => {
  let prefix = timestamp < 0 ? "-" : "+";
  return prefix + fromMsToHrsMins(Math.abs(timestamp));
};

      let exitStamp = TF.dateTimeStamp(timestamp, utcOffset);
      let diffStamp = TF.diffTimestamp(today.enter.timestamp, exitStamp.timestamp, shiftLength);
      let diffTime = TF.formatDiffTimestamp(diffStamp);
                work: {timestamp: diffStamp, time: diffTime}
*/

export const absDifferenceInTimestamps = (ts1, ts2, printSeconds = false) => {
  const hrs = zeroPad(Math.abs(differenceInHours(ts1,ts2)));
  const mins = zeroPad(Math.abs(differenceInMinutes(ts1,ts2))%60);
  if (printSeconds) {
    const secs = zeroPad(Math.abs(differenceInSeconds(ts1,ts2))%60);
    return `${hrs}:${mins}:${secs}`;
    }  else {
    return `${hrs}:${mins}`;
  }
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

