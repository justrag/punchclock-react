import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { logIn as logInAction } from '../actions/';
import { isUserLoading, getLoginError, getUserToken } from '../selectors/';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
  }
  loginChange = ev => this.setState({ login: ev.target.value });
  passwordChange = ev => this.setState({ password: ev.target.value });
  submit = ev => {
    ev.preventDefault();
    this.props.loginAction(this.state.login, this.state.password);
    this.setState({ login: '', password: '' });
  };

  render() {
    return (
      <div>
        {this.props.token
          ? <Redirect to="/clock" />
          : <div className="at-form" style={{ textAlign: 'center' }}>
              <div className="at-title">
                <h3>Zaloguj się</h3>
              </div>
              {!!this.props.isLoading && <div>Trwa logowanie...</div>}
              {!this.props.isLoading &&
                <form onSubmit={this.submit}>
                  <div className="at-input">
                    <label htmlFor="login">Login</label>
                    <input
                      type="text"
                      name="login"
                      minLength={5}
                      value={this.state.login}
                      onChange={this.loginChange}
                    />
                  </div>
                  <div className="at-input">
                    <label htmlFor="password">Hasło</label>
                    <input
                      type="password"
                      name="password"
                      minLength={8}
                      value={this.state.password}
                      onChange={this.passwordChange}
                    />
                  </div>
                  <button type="submit">Zaloguj się</button>
                </form>}
              {!!this.props.loginError &&
                <div className="danger at-error">
                  <div>
                    <strong>Błąd logowania.</strong>
                  </div>
                </div>}
              <div className="at-pwd-link">
                <p>
                  <NavLink to="/forgotpassword" className="at-link at-pwd">
                    Zapomniałeś hasła?
                  </NavLink>
                </p>
              </div>
              <div className="at-signup-link">
                <p>
                  Nie masz konta?&nbsp;
                  <NavLink to="/register" className="at-link at-signup">
                    Zarejestruj się
                  </NavLink>
                </p>
              </div>
            </div>}
      </div>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loginError: PropTypes.bool
  /*
  loginError: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }),
  */
};
const mapStateToProps = state => ({
  isLoading: isUserLoading(state),
  loginError: getLoginError(state),
  token: getUserToken(state)
});
export default connect(mapStateToProps, { loginAction: logInAction })(Login);
