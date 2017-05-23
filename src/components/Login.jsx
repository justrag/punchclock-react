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
  <div>
    {!!this.props.isLoading && <div>Logging in...</div>}
    {!this.props.isLoading &&
      <form onSubmit={this.submit}>
          <input type="text" name="login" minLength={5} value={this.state.login} onChange={this.loginChange} />
          <input type="password" name="password" minLength={8} value={this.state.password} onChange={this.passwordChange} />
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
