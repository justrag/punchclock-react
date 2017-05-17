import { combineReducers } from 'redux';
import {WEEK, MONTH, YEAR} from '../constants/';

const data = (state, action) => {
  if (action.stats && action.stats.data) {
    return {...state, bulba: action.stats.data};
  }
  return {[WEEK]: {}, [MONTH]: {}, [YEAR]: {}};
}

const slide = (state, action) => {
  if (action.stats && action.stats.period && action.stats.delta) {
    return {...state, [action.stats.period]: state.period + action.stats.delta};
  }
  return {[WEEK]: 0, [MONTH]: 0, [YEAR]: 0};
}

const stats = combineReducers(data, slide);

export default stats;
