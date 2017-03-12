export const formatDate = (timestamp, utcOffset=0) => moment(timestamp).utcOffset(utcOffset).format("YYYYMMDD");

//  const formatTime = (timestamp, utcOffset=0) => moment(timestamp).utcOffset(utcOffset).format("HH:mm:ss");
export const formatTime = (timestamp, utcOffset=0) => moment(timestamp).utcOffset(utcOffset).format("HH:mm");

export const splitTime = (timestamp, utcOffset=0) => {
    let m = moment(timestamp).utcOffset(utcOffset);
    let formats = {
      day: "D",
      month: "MMM",
      year: "YYYY",
      hour: "HH",
      minute: "mm",
      second: "ss"
    };
    return lodash.mapValues(formats, function(val) {
      return m.format(val);
    });
  };

export const todaysDate = () => moment().format("YYYYMMDD");
export const hoursToMilliseconds = (ms) => ms * 3600000;

export const dateTimeStamp = (timestamp = Date.now(), utcOffset=0) => {
    //let timestamp = Date.now();
    let date = formatDate(timestamp, utcOffset);
    let time = formatTime(timestamp, utcOffset);
    return {
      timestamp, date, time
    };
  }

export const fromMsToHrsMinsSecs = (duration) => moment.utc(duration).format("HH:mm:ss");
export const fromMsToHrsMins = (duration) => moment.utc(duration).format("HH:mm");

export const diffTimestamp = (begin, end, length) => end - begin - hoursToMilliseconds(length);

export const formatDiffTimestamp = (timestamp) => {
    let prefix = (timestamp < 0) ? "-" : "+";
    return prefix + fromMsToHrsMins(Math.abs(timestamp));
//    return fromMsToHrsMins(Math.abs(timestamp));
  }

export const firstDayOfTheWeek = (timestamp) => moment(timestamp).startOf('week').format("YYYYMMDD");
export const firstDayOfTheMonth = (timestamp) => moment(timestamp).startOf('month').format("YYYYMMDD");
export const firstDayOfTheYear = (timestamp) => moment(timestamp).startOf('year').format("YYYYMMDD");
