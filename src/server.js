import {default as TF} from '/imports/timeFunctions';
//import * as TF from '/imports/timeFunctions';

    const sumWorktime = (begin,end) => {
      let timestamp = 0;
      let shift=0;
      let workdays=0;
      let incs = Incidents.find({
        userId: Meteor.userId(),
        "exit.date": {
          $gte: begin,
          $lte: end
        }
      }, {
        fields: {
          "work.timestamp": true,
          "shift": true
        }
      }).forEach(function(i) {
        timestamp += i.work.timestamp;
        shift+=i.shift;
        workdays++;
      });
      return {timestamp, shift, workdays};
    };


   const statsGen = (theMoment, period) => {
      let dateFormat={
        "week": (begin,end) => begin.format("D MMMM YYYY")+"-"+end.format("D MMMM YYYY"),
        "month": (begin) => begin.format("MMMM YYYY"),
        "year": (begin) => begin.format("YYYY")
      };
let begin=moment(theMoment).startOf(period);
let end=moment(theMoment).endOf(period);
let sumValues=sumWorktime(begin.format("YYYYMMDD"),end.format("YYYYMMDD"));
let date=dateFormat[period](begin,end);
let sum=TF.formatDiffTimestamp(sumValues.timestamp);
let thumbsUp=(sumValues.timestamp>=0);
return {date, diff: sum, thumbsUp, shift: sumValues.shift, days: sumValues.workdays};
   }

    State.modify('Stats', (state = false) => {
    //  let bulbaState=State.get('Stats');
    //  console.debug("bulbaState: %o",bulbaState);
            let actionType = Action.type();
if (!state || actionType=="STATSBROWSE_RESET") {
// initialize
      let newState=["week","month","year"].reduce(function(prev,curr) {
let stats=statsGen(moment(), curr);
prev[curr]={};
Object.assign(prev[curr],{delta: 0, unplusable: true, unminusable: false},stats);
return prev;
}, {});
newState.changeme=0;
console.debug("INIT - newState should be: %o",newState);
return newState;
} else if (actionType!="STATSBROWSE_CHANGED") {
  return state;
} else {
if (!_.contains(["week", "month", "year"], Action.period) || !_.contains(["plus", "minus"], Action.direction)) {
          // FIXME: SOMEONE'S PLAYING WITH HTML
        }
let period=Action.period;
let tryDelta = (Action.direction == "plus") ? 1 : -1;
console.log("period: "+period+" tryDelta: "+tryDelta);
let tryout=state[period].delta+tryDelta;
let changedMoment=moment().add(tryout,period);
let jan1st2000=moment("2000-01-01", "YYYY-MM-DD");
let now=moment();
  let newState = Object.assign({}, state);
if (changedMoment.isBetween(jan1st2000, now, "day", '[]')) {
  newState[period].delta+=tryDelta;
  newState[period].unplusable=!moment(changedMoment).add(1,period).isBetween(jan1st2000, now, "day", '[]');
  newState[period].unminusable=!moment(changedMoment).add(-1,period).isBetween(jan1st2000, now, "day", '[]');  
let stats=statsGen(changedMoment, period);
Object.assign(newState[period],stats);
}
//newState.timestamp=Date.now();
newState.changeme+=1;
console.debug("newState: %o",newState);
return newState;
};

});




  Meteor.methods({
    addEnter: function(timestamp, utcOffset) {
      // FIXME: check if timestamp correct
      let userId = checkUser();
      let today = findMatchingIncident(userId,moment(timestamp).format("YYYYMMDD"));
      if (today)
        throw new Meteor.Error("already-entered", "Już w tym dniu wszedłeś.");
      Incidents.insert({
        userId: userId,
        enter: TF.dateTimeStamp(timestamp, utcOffset)
      });
    },
    addExit: function(timestamp,shiftLength,utcOffset) {
      // FIXME: check if timestamp correct
      let userId = checkUser();
      if (!shiftLength) throw new Meteor.Error("shiftlength-not-specified", "Nie podałeś długości szychty.");
          if (!timestamp) throw new Meteor.Error("timestamp-not-specified", "Nie podałeś czasu.");
          if (!utcOffset) throw new Meteor.Error("utcOffset-not-specified", "Nie podałeś utcOffset.");
      let today = findMatchingIncident(userId,moment(timestamp).format("YYYYMMDD"));      
      if (!today) throw new Meteor.Error("not-yet-entered", "Jeszcze w tym dniu nie wszedłeś.");
      if (today.exit) throw new Meteor.Error("already-exited", "Już w tym dniu wyszedłeś.");
      let exitStamp = TF.dateTimeStamp(timestamp, utcOffset);
      let diffStamp = TF.diffTimestamp(today.enter.timestamp, exitStamp.timestamp, shiftLength);
      let diffTime = TF.formatDiffTimestamp(diffStamp);
      Incidents.update({
        _id: today._id
      }, {
        $set: {
          exit: exitStamp,
          shift: shiftLength,
          work: {
            timestamp: diffStamp,
            time: diffTime
          }
        }
      });
    },
    changeEnter: function(timestamp, utcOffset) {
     let userId = checkUser();
          if (!timestamp) throw new Meteor.Error("timestamp-not-specified", "Nie podałeś czasu.");
          if (!utcOffset) throw new Meteor.Error("utcOffset-not-specified", "Nie podałeś utcOffset.");
     let today = findMatchingIncident(userId,moment(timestamp).format("YYYYMMDD"));
      if (!today) throw new Meteor.Error("not-yet-entered", "Jeszcze w tym dniu nie wszedłeś.");
     let enterStamp=TF.dateTimeStamp(timestamp, utcOffset);
let incUpdate={enter: enterStamp};
if (today.exit) {
      let diffStamp = TF.diffTimestamp(enterStamp.timestamp, today.exit.timestamp, today.shift);
      let diffTime = TF.formatDiffTimestamp(diffStamp);
      incUpdate.work={timestamp: diffStamp, time: diffTime};
};
      Incidents.update({
        _id: today._id
      }, {
        $set: incUpdate});
    },
        changeExit: function(timestamp,shiftLength,utcOffset) {
      // FIXME: check if timestamp correct
      let userId = checkUser();
      if (!shiftLength) throw new Meteor.Error("shiftlength-not-specified", "Nie podałeś długości szychty.");
          if (!timestamp) throw new Meteor.Error("timestamp-not-specified", "Nie podałeś czasu.");
          if (!utcOffset) throw new Meteor.Error("utcOffset-not-specified", "Nie podałeś utcOffset.");
      let today = findMatchingIncident(userId,moment(timestamp).format("YYYYMMDD"));      
      if (!today) throw new Meteor.Error("not-yet-entered", "Jeszcze w tym dniu nie wszedłeś.");
      let exitStamp = TF.dateTimeStamp(timestamp, utcOffset);
      let diffStamp = TF.diffTimestamp(today.enter.timestamp, exitStamp.timestamp, shiftLength);
      let diffTime = TF.formatDiffTimestamp(diffStamp);
      Incidents.update({
        _id: today._id
      }, {
        $set: {
          exit: exitStamp,
          shift: shiftLength,
          work: {
            timestamp: diffStamp,
            time: diffTime
          }
        }
      });
    },
  });

  const findTodaysIncident = (userId) => Incidents.findOne({
    userId: userId,
    "enter.date": TF.todaysDate()
  });

const findMatchingIncident = (userId, enterDate) => Incidents.findOne({
    userId: userId,
    "enter.date": enterDate
  });

  const checkUser = () => {
    let userId = Meteor.userId();
    if (!userId)
      throw new Meteor.Error("not-logged-in", "Nie jesteś zalogowany.");
    return userId;
  }
