import { createAction } from "redux-act";

export const logOut = createAction("LOGOUT");
export const timeSelectChange = createAction(
  "TIMESELECT",
  (period,direction) => ({ period, direction })
);
