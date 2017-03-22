import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import user, * as fromUser from './user';
import timeselect, * as fromTimeselect from './timeselect';
import clockface, * as fromClockface from './clockface';
import shift, * as fromShift from './shift';

export const getUserLogin = state => fromUser.getUserLogin(state.user);
export const getUserToken = state => fromUser.getUserToken(state.user);

export const isTimeselectToday = state => fromTimeselect.isItToday(state.timeselect);
export const getTimeselectDate = state => fromTimeselect.getDate(state.timeselect);
export const getTimeselectMonths = state => fromTimeselect.getMonths(state.timeselect);
export const getTimeselectYears = state => fromTimeselect.getYears(state.timeselect);
export const getTimeselectMinutes = state => fromTimeselect.getMinutes(state.timeselect);
export const getTimeselectHours = state => fromTimeselect.getHours(state.timeselect);

export const getTimeselectSelected = state => fromTimeselect.getSelected(state.timeselect);
export const getTimeselectString = state => fromTimeselect.getString(state.timeselect);

export const getClockfaceDisplay = state => fromClockface.getDisplay(state.clockface);
export const getShiftLength = state => fromShift.getLength(state.shift);

export const isTimeselectFirstDay = state => fromTimeselect.isFirstDay(state.timeselect);
export const isTimeselectLastDay = state => fromTimeselect.isLastDay(state.timeselect);
export const getTimeselectPrevDate = state => fromTimeselect.getPrevDate(state.timeselect);
export const getTimeselectPrevMonth = state => fromTimeselect.getPrevMonth(state.timeselect);
export const getTimeselectPrevYear = state => fromTimeselect.getPrevYear(state.timeselect);
export const getTimeselectNextDate = state => fromTimeselect.getNextDate(state.timeselect);
export const getTimeselectNextMonth = state => fromTimeselect.getNextMonth(state.timeselect);
export const getTimeselectNextYear = state => fromTimeselect.getNextYear(state.timeselect);
export const getTimeselectPrevHour = state => fromTimeselect.getPrevHour(state.timeselect);
export const getTimeselectNextHour = state => fromTimeselect.getNextHour(state.timeselect);
export const getTimeselectPrevMinute = state => fromTimeselect.getPrevMinute(state.timeselect);
export const getTimeselectNextMinute = state => fromTimeselect.getNextMinute(state.timeselect);

const reducer = combineReducers({
  user,
  timeselect,
  clockface,
  shift,
//  routing: routerReducer,
});

export default reducer;
