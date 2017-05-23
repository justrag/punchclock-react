import { timeselectSetTimestamp } from '../actions/';
import { getTimeselectSelected } from '../selectors/'
// clockTick middleware
// dispatches timeselectSetTimestamp action with a current selected & timestamp
// when receiving action with meta.tick set to true
const clockTick = ({ getState, dispatch }) => next => action => {
  if (action.meta && action.meta.tick) {
    dispatch(timeselectSetTimestamp(getTimeselectSelected(getState()), Date.now()));
  }
  return next(action);
};
export default clockTick;
