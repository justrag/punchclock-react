import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import user, * as fromUser from './user';
import timeselect, * as fromTimeselect from './timeselect';
import shift, * as fromShift from './shift';
import incidents, * as fromIncidents from './incidents';
import { formatDate, formatTime } from '../libs/timeFunctions';

export const getUserLogin = state => fromUser.getUserLogin(state.user);
export const getUserToken = state => fromUser.getUserToken(state.user);

export const isTimeselectToday = state => fromTimeselect.isItToday(state.timeselect);
export const getTimeselectDate = state => fromTimeselect.getDate(state.timeselect);
export const getTimeselectMonths = state => fromTimeselect.getMonths(state.timeselect);
export const getTimeselectYears = state => fromTimeselect.getYears(state.timeselect);
export const getTimeselectMinutes = state => fromTimeselect.getMinutes(state.timeselect);
export const getTimeselectHours = state => fromTimeselect.getHours(state.timeselect);

export const getTimeselectSelected = state => fromTimeselect.getSelected(state.timeselect);
export const getTimeselectTimestring = state => fromTimeselect.getTimestring(state.timeselect);

export const getTimeselectDisplay = state => fromTimeselect.getDisplay(state.timeselect);
export const getTimeselectTimestamp = state => fromTimeselect.getTimestamp(state.timeselect);

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
  shift,
  incidents,
//  routing: routerReducer,
});

export default reducer;

export const getEnterOnSelectedDate = state => {
  const enter = fromIncidents.getEnterOnDate(state.incidents, formatDate(getTimeselectTimestamp(state)))
  return (enter ? formatTime(enter) : false);
}
export const getExitOnSelectedDate = state => {
  const exit = fromIncidents.getExitOnDate(state.incidents, formatDate(getTimeselectTimestamp(state)));
  return (exit ? formatTime(exit) : false);
}
