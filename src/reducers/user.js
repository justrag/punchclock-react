import { createReducer } from "redux-act";
import { logIn, logOut } from "../actions/";

const user = createReducer(
  {
    [logIn]: () => ({ login: "johnny", token: "SOMETOKEN" }),
    [logOut]: () => ({ login: false, token: false })
  },
  { login: false, token: false }
);
export default user;

export const getUserLogin = state => state.login;
export const getUserToken = state => state.token;
