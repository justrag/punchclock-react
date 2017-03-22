import { createAction } from "redux-act";

export const logIn = createAction("LOG_IN");
export const logOut = createAction("LOG_OUT");
export const timeselectReset = createAction("TIMESELECT_RESET");
export const timeselectChange = createAction(
  "TIMESELECT_CHANGE",
  (period,direction) => ({ period, direction })
);
export const clockTick = createAction("CLOCK_TICK");
