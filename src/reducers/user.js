import { createReducer } from "redux-act";
import { logInRequest, logInSuccess, logInFailure, logOut } from "../actions/";

const user = createReducer(
  {
/*    [logIn]: () => ({ login: "johnny", token: "SOMETOKEN" }), */

    [logInRequest]: () => ({ login: false, token: false, loading: true, error: false }),
    [logInFailure]: () => ({ login: false, token: false, loading: false, error: true }),
    [logInSuccess]: (login, token) => ({ login, token, loading: false, error: false }),
    [logOut]: () => ({ login: false, token: false, loading: false, error: false }),
  },
  { login: false, token: false, loading: false, error: false }
);
export default user;

export const getUserLogin = state => state.login;
export const getUserToken = state => state.token;
export const isUserLoading = state => state.loading;
export const getLoginError = state => state.error;
