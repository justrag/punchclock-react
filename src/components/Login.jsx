import React from "react";
import { connect } from "react-redux";
import { isUserLoading } from "../reducers/";
import { logIn as logInAction } from "../actions/";

const Login = ({ logIn, isUserLoading }) => (
  <div>
  {isUserLoading ? <h1>Login in progress...</h1>
  :
  <button onClick={logIn}>Zaloguj się</button>}
  </div>
);

const mapStateToProps = state => ({
  isUserLoading: isUserLoading(state),
});

export default connect(mapStateToProps, {
  logIn: () => logInAction(),
})(Login);
