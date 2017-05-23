import { combineReducers } from "redux";
import R from "ramda";
import {WEEK, MONTH, YEAR, STATS_RESET} from "../constants/";

const slide = period => (state = 0, action) => {
  if (action.type === STATS_RESET) {
    return 0;
  }
  if (action.stats && action.stats.delta && action.stats.period === period) {
    return Math.min(state + action.stats.delta, 0);
  }
  return state;
}

const loading = period => (state = false, action) => {
  if (action.stats && action.stats.period === period) {
    return !!action.stats.request;
  }
  return state;  
}

const error = period => (state = false, action) => {
  if (action.stats && action.stats.period === period) {
    return !!action.stats.error;
  }
  return state;  
}

const data = period => (state = {}, action) => {
  if (action.stats && action.stats.data && action.stats.period === period) {
    return action.stats.data;
  }
  return state;
}

const stats = combineReducers(
  R.map(p =>
    combineReducers({
      loading: loading(p),
      data: data(p),
      error: error(p),
      slide: slide(p)
    }), {week: WEEK, month: MONTH, year: YEAR})
);

export default stats;
