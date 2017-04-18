import { combineReducers } from 'redux';
import { createReducer } from "redux-act";
import { logInRequest, logInSuccess, logInFailure, logOut } from "../actions/";


/*
const user = createReducer(
  {
    [logInRequest]: () => ({ login: false, token: false, loading: true, error: false }),
    [logInFailure]: () => ({ login: false, token: false, loading: false, error: true }),
    [logInSuccess]: (login, token) => ({ login, token, loading: false, error: false }),
    [logOut]: () => ({ login: false, token: false, loading: false, error: false }),
  },
  { login: false, token: false, loading: false, error: false }
);
*/

const login = createReducer({
  [logInRequest]: () => false,
  [logInFailure]: () => false,
  [logInSuccess]: (state, {login, token}) => login,
  [logOut]: () => false
}, false);

const token = createReducer({
  [logInRequest]: () => false,
  [logInFailure]: () => false,
  [logInSuccess]: (state, {login, token}) => token,
  [logOut]: () => false
}, false);

const loading = createReducer({
  [logInRequest]: () => true,
  [logInFailure]: () => false,
  [logInSuccess]: () => false,
  [logOut]: () => false
}, false);

const error = createReducer({
  [logInRequest]: () => false,
  [logInFailure]: () => true,
  [logInSuccess]: () => false,
  [logOut]: () => false
}, false);

const user = combineReducers({
  login,
  token,
  loading,
  error
  });

export default user;

export const getUserLogin = state => state.login;
export const getUserToken = state => state.token;
export const isUserLoading = state => state.loading;
export const getLoginError = state => state.error;
