import { createAction } from "redux-act";
import { formatDate } from "../libs/timeFunctions";

export const logIn = createAction("LOG_IN");
export const logOut = createAction("LOG_OUT");

export const timeselectReset = createAction("TIMESELECT_RESET");
export const timeselectShiftlengthIncrease = createAction("TIMESELECT_SHIFTLENGTH_INCREASE");
export const timeselectShiftlengthDecrease = createAction("TIMESELECT_SHIFTLENGTH_DECREASE");
export const timeselectChangeDay = createAction("TIMESELECT_CHANGE_DAY");
export const timeselectChangeDate = createAction("TIMESELECT_CHANGE_DATE");
export const timeselectChangeMonth = createAction("TIMESELECT_CHANGE_MONTH");
export const timeselectChangeYear = createAction("TIMESELECT_CHANGE_YEAR");
export const timeselectChangeHour = createAction("TIMESELECT_CHANGE_HOUR");
export const timeselectChangeMinute = createAction("TIMESELECT_CHANGE_MINUTE");
export const timeselectSetTimestamp = createAction("TIMESELECT_SET_TIMESTAMP", (selected, newTimestamp) => ({selected, newTimestamp}));

// should be async to API, just put it in store for now
export const incidentSetEnter = createAction("INCIDENT_SET_ENTER", timestamp => ({timestamp, numericalDate: formatDate(timestamp)}));
export const incidentSetExit = createAction("INCIDENT_SET_EXIT",
  (timestamp, shiftLength) => ({timestamp, numericalDate: formatDate(timestamp), shiftLength}));

export const clockTick = createAction("CLOCK_TICK", null, () => ({tick: true})); // to be intercepted by clockTick middleware
