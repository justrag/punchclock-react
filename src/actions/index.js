import { createAction } from "redux-act";
import { formatDate } from "../libs/timeFunctions";
export const logIn = createAction("LOG_IN");
export const logOut = createAction("LOG_OUT");
export const timeselectReset = createAction("TIMESELECT_RESET");
/*
export const timeselectChange = createAction(
  "TIMESELECT_CHANGE",
  (period,direction) => ({ period, direction })
);
*/
export const timeselectChangeDay = createAction("TIMESELECT_CHANGE_DAY");
export const timeselectChangeDate = createAction("TIMESELECT_CHANGE_DATE");
export const timeselectChangeMonth = createAction("TIMESELECT_CHANGE_MONTH");
export const timeselectChangeYear = createAction("TIMESELECT_CHANGE_YEAR");
export const timeselectChangeHour = createAction("TIMESELECT_CHANGE_HOUR");
export const timeselectChangeMinute = createAction("TIMESELECT_CHANGE_MINUTE");

// should be async to API, just put it in store for now
export const incidentSetEnter = createAction("INCIDENT_SET_ENTER", timestamp => ({timestamp, numericalDate: formatDate(timestamp)}));
export const incidentSetExit = createAction("INCIDENT_SET_EXIT", timestamp => ({timestamp, numericalDate: formatDate(timestamp)}));

export const clockTick = createAction("CLOCK_TICK", null, () => ({tick: true})); // to be intercepted by clockTick middleware
export const timeselectSetTimestamp = createAction("TIMESELECT_SET_TIMESTAMP", (selected, newTimestamp) => ({selected, newTimestamp}));
