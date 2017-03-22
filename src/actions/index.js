import { createAction } from "redux-act";

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

export const clockTick = createAction("CLOCK_TICK");
