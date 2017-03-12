import {default as TF} from '/imports/timeFunctions';
//import * as TF from '/imports/timeFunctions';

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
