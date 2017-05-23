import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import user from './user';
import timeselect from './timeselect';
import incidents from './incidents';
import stats from './stats';

const reducer = combineReducers({
  user,
  timeselect,
  incidents,
  stats
//  routing: routerReducer,
});

export default reducer;
