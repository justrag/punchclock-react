function zeroPad(val) {return (val<10)?("0"+val):(val);}

    State.modify('Timeselect', (state = false) => {
      let actionType = Action.type();
      let selected, m;
      let formats = {
        date: "D",
        months: "MMM",
        years: "YYYY",
        hours: "HH",
        minutes: "mm",
        seconds: "ss"
      };
      if (!state || actionType == "TIMESELECT_RESET") {
        selected = false;
        m = moment();
      } else if (!_.contains(["TIMESELECT_RESET","TIMESELECT_CHANGED","CLOCK_TICK"], actionType)) {
        return state;
      } else if (actionType == "CLOCK_TICK") {
        selected = state.selected;
        if (state.selected) {
          m = moment(state.dates);
        } else {
          m = moment();
        }
      } else if (actionType == "TIMESELECT_CHANGED") {
        if (!_.contains(["day", "date", "months", "years", "minutes", "hours"], Action.dateField) || !_.contains(["plus", "minus"], Action.direction)) {
          // FIXME: SOMEONE'S PLAYING WITH HTML
        }
        selected = true;
        let oldm = moment(state.dates);
        let delta = (Action.direction == "plus") ? 1 : -1;
        let limit = state.limits[Action.dateField];
        let cond = (Action.direction == "plus") ? limit.last : limit.first;
        if (!cond)
          oldm.add(delta, (Action.dateField == "date") ? "days" : Action.dateField);
        //m.set(Action.dateField, state.dates[Action.dateField] + delta);
        m = moment.min(moment().endOf("day"), oldm);
      };

      let timestamp = m.valueOf();
      let numericalDate = m.format("YYYYMMDD");
      let isItToday = (numericalDate == moment().format("YYYYMMDD"));
      let timeString = m.format("HH:mm");
      let utcOffset = m.utcOffset();
      let dates = m.toObject();
      let parts = lodash.mapValues(formats, function(val) {
        return m.format(val);
      });
      let limits = {
        day: {
          first: (dates.date == 1 && dates.months == 0 && dates.year == 2000),
          last: m.isSameOrAfter(moment(), 'day')
        },
        date: {
          first: (dates.date == 1),
          last: (moment(m).endOf("month").date() == dates.date)
        },
        months: {
          first: (dates.months == 0),
          last: (dates.months == 11)
        },
        years: {
          first: (dates.years == 2000),
          last: (dates.years == moment().year())
        },
        hours: {
          first: (dates.hours == 0),
          last: (dates.hours == 23)
        },
        minutes: {
          first: (dates.minutes == 0),
          last: (dates.minutes == 59)
        }
      };
      let prev={};
      let next={};
      ["date","years"].forEach(function(val) {
        if (limits[val].first) {prev[val]="";} else {prev[val]=dates[val]-1;};
        if (limits[val].last) {next[val]="";} else {next[val]=dates[val]+1;};
      });
      let monthsList=moment.monthsShort();
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
