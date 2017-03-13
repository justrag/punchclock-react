import { createReducer } from 'redux-act';
import { logOut } from '../actions/';

const reducer = createReducer({
  [logOut]: () => false,
}, true);

export default reducer;