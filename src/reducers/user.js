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

const login = createReducer(
  {
    [logInRequest]: () => false,
    [registerRequest]: () => false,
    [logInFailure]: () => false,
    [registerFailure]: () => false,
    [logInSuccess]: (state, { login, token }) => login,
    [registerSuccess]: (state, { login, token }) => login,
    [logOut]: () => false
  },
  false
);

const token = createReducer(
  {
    [logInRequest]: () => false,
    [logInFailure]: () => false,
    [logInSuccess]: (state, { login, token }) => token,
    [registerRequest]: () => false,
    [registerFailure]: () => false,
    [registerSuccess]: (state, { login, token }) => token,
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

const error = createReducer(
  {
    [logInRequest]: () => false,
    [logInFailure]: () => true,
    [logInSuccess]: () => false,
    [registerRequest]: () => false,
    [registerFailure]: () => true,
    [registerSuccess]: () => false,
    [logOut]: () => false
  },
  false
);

const user = combineReducers({
  login,
  token,
  loading,
  error
});

export default user;
