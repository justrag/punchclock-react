import { combineReducers } from 'redux';
import addHours from 'date-fns/add_hours';
//import { routerReducer } from 'react-router-redux';
import user, * as fromUser from './user';
import timeselect, * as fromTimeselect from './timeselect';
import incidents, * as fromIncidents from './incidents';
import { formatDate, formatTime, formatDifferenceInTimestamps, absDifferenceInTimestamps } from '../libs/timeFunctions';

export const getUserLogin = state => fromUser.getUserLogin(state.user);
export const getUserToken = state => fromUser.getUserToken(state.user);
export const isUserLoading = state => fromUser.isUserLoading(state.user);
export const getLoginError = state => fromUser.getLoginError(state.user);

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
export const getTimeselectCurrentTimestamp = state => fromTimeselect.getCurrentTimestamp(state.timeselect);

export const getTimeselectShiftlength = state => fromTimeselect.getShiftlength(state.timeselect);
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
  incidents,
//  routing: routerReducer,
});

export default reducer;

export const getEnterTimestampOnSelectedDate = state => fromIncidents.getEnterOnDate(state.incidents, formatDate(getTimeselectTimestamp(state)));

export const getEnterOnSelectedDate = state => {
  const enter = getEnterTimestampOnSelectedDate(state);
  return (enter ? formatTime(enter) : false);
}

export const getExitTimestampOnSelectedDate = state => fromIncidents.getExitOnDate(state.incidents, formatDate(getTimeselectTimestamp(state)));

export const getExitOnSelectedDate = state => {
  const exit = getExitTimestampOnSelectedDate(state);
  return (exit ? formatTime(exit) : false);
}

export const getShiftLengthOnSelectedDate = state =>
  fromIncidents.getShiftlengthOnDate(
    state.incidents,
    formatDate(getTimeselectTimestamp(state))
    );

export const getWorktimeForSelectedDate = (state) => 
 formatDifferenceInTimestamps(
  addHours(
    getEnterTimestampOnSelectedDate(state),
    getShiftLengthOnSelectedDate(state)
    ).valueOf(),
  getExitTimestampOnSelectedDate(state));

export const getAbsTimeTillLeave = (state) => {
  const enter = getEnterTimestampOnSelectedDate(state);
  const exit = getTimeselectCurrentTimestamp(state);
  const shiftlength = getTimeselectShiftlength(state);
  const dueDate = addHours(enter,shiftlength);
  return absDifferenceInTimestamps(dueDate.valueOf(), exit, true);
};
export const isOvertime = (state) => (
    addHours(
    getEnterTimestampOnSelectedDate(state),
    getTimeselectShiftlength(state)
    ).valueOf() < getTimeselectCurrentTimestamp(state)
);
