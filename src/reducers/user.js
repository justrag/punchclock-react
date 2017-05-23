import { combineReducers } from 'redux';
import { createReducer } from "redux-act";
import { logInRequest, logInSuccess, logInFailure, logOut } from "../actions/";

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
