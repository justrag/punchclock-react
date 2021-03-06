import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  logInRequest,
  logInSuccess,
  logInFailure,
  logOut,
  registerRequest,
  registerSuccess,
  registerFailure
} from '../actions/';

const account = createReducer(
  {
    [logInRequest]: () => false,
    [registerRequest]: () => false,
    [logInFailure]: () => false,
    [registerFailure]: () => false,
    [logInSuccess]: (state, { email, token }) => ({
      email,
      token
    }),
    [registerSuccess]: (state, { email, token }) => ({
      email,
      token
    }),
    [logOut]: () => false
  },
  false
);

const loading = createReducer(
  {
    [logInRequest]: () => true,
    [logInFailure]: () => false,
    [logInSuccess]: () => false,
    [registerRequest]: () => true,
    [registerFailure]: () => false,
    [registerSuccess]: () => false,
    [logOut]: () => false
  },
  false
);

const user = combineReducers({
  account,
  loading
});

export default user;
