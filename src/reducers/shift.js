import { createReducer } from "redux-act";
import { shiftlengthIncrease, shiftlengthDecrease } from "../actions/";

const shift = createReducer(
  {
    [shiftlengthIncrease]: state => ((state <= 11) ? state + 1 : state),
    [shiftlengthDecrease]: state => ((state >= 2) ? state - 1 : state),
  },
  8
);
export default shift;
export const getShift = state => state;
