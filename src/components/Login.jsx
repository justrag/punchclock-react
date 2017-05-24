import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
//import ReactSpinner from 'react-spinjs';
import { logIn as logInAction } from "../actions/";
import { isUserLoading, getLoginError } from '../selectors/';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
  }
  loginChange = ev => this.setState({login: ev.target.value});
  passwordChange = ev => this.setState({password: ev.target.value});
  submit = ev => {
    ev.preventDefault();
    this.props.loginAction(this.state.login, this.state.password);
    this.setState({ login: '', password: '' });
  }

render() {
return (
  <div className="at-form" style={{textAlign: 'center'}}>
  <div className="at-title">
    <h3>Zaloguj się</h3>
  </div>
    {!!this.props.isLoading && <div>Logging in...</div>}
    {!this.props.isLoading &&
      <form onSubmit={this.submit}>
        <div className="at-input">
          <label htmlFor="login">
            Login
          </label>
          <input type="text" name="login" minLength={5} value={this.state.login} onChange={this.loginChange} />
        </div>
        <div className="at-input">
          <label htmlFor="password">
            Hasło
          </label>
          <input type="password" name="password" minLength={8} value={this.state.password} onChange={this.passwordChange} />
        </div>
        <button type="submit">
          Zaloguj się
        </button>
      </form>
      }
    {!!this.props.loginError &&
      <div className="danger">
        <div><strong>Błąd: {this.props.loginError.name}</strong></div>
        <div>{this.props.loginError.message}</div>
      </div> }
  </div>
 );
};
};


/*
<div class="at-form">
  <div class="at-title">
    <h3>Zaloguj się</h3>
  </div>
  <div class="at-error">
    <p>Musisz być zalogowany</p>
  </div>
  <div class="at-pwd-form">
    <form role="form" id="at-pwd-form" novalidate="" action="#" method="POST">
      <div class="at-input">
        <label for="at-field-email">
          Email 
        </label>
        <input id="at-field-email" name="at-field-email" placeholder="Email" autocapitalize="none" autocorrect="off" type="email">
      </div>
      <div class="at-input">
        <label for="at-field-password">
          Hasło 
        </label>
        <input id="at-field-password" name="at-field-password" placeholder="Hasło" autocapitalize="none" autocorrect="off" type="password">
      </div>
      <div class="at-pwd-link">
        <p>
          <a href="/forgot-password" id="at-forgotPwd" class="at-link at-pwd">Zapomniałeś hasła?</a>
        </p>
      </div>
      <button type="submit" class="at-btn submit" id="at-btn">
        Zaloguj się
      </button>
    </form>
  </div>
  <div class="at-signup-link">
    <p>
      Nie masz konta?
      <a href="/sign-up" id="at-signUp" class="at-link at-signup">Zarejestruj się</a>
    </p>
  </div>
</div>
*/

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
});
export default connect(mapStateToProps, {loginAction: logInAction})(Login);
