import R from "ramda";

export const getStatus = state => state.request;
export const getEnterOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'enter'], state);
export const getExitOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'exit'], state);
export const getShiftlengthOnDate = (state, numericalDate) =>
  R.path(['data', numericalDate, 'shiftlength'], state);
