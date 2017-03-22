import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user, * as fromUser from './user';
import timeselect, * as fromTimeselect from './timeselect';
import clockface, * as fromClockface from './clockface';
import shift, * as fromShift from './shift';

export const getUserLogin = state => fromUser.getUserLogin(state.user);
export const getUserToken = state => fromUser.getUserToken(state.user);
export const getTimeselectLimits = state => fromTimeselect.getLimits(state.timeselect);

export const getTimeselectDate = state => fromTimeselect.getDate(state.timeselect);
export const getTimeselectMonths = state => fromTimeselect.getMonths(state.timeselect);
export const getTimeselectYears = state => fromTimeselect.getYears(state.timeselect);
export const getTimeselectMinutes = state => fromTimeselect.getMinutes(state.timeselect);
export const getTimeselectHours = state => fromTimeselect.getHours(state.timeselect);
export const getTimeselectPrev = state => fromTimeselect.getPrev(state.timeselect);
export const getTimeselectNext = state => fromTimeselect.getNext(state.timeselect);
export const getTimeselectSelected = state => fromTimeselect.getSelected(state.timeselect);
export const getTimeselectString = state => fromTimeselect.getString(state.timeselect);
export const getClockfaceDisplay = state => fromClockface.getDisplay(state.clockface);
export const getShiftLength = state => fromShift.getLength(state.shift);
export const isTimeselectToday = state => fromTimeselect.isItToday(state.timeselect);

const reducer = combineReducers({
  user,
  timeselect,
  clockface,
  shift,
  routing: routerReducer,
});

export default reducer;
