import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/';
import { isUserLoading, getLoginError, getUserToken } from '../selectors/';
import Flash from './Flash';

const centerStyle = { textAlign: 'center' };

const Register = ({
  fields,
  changeFieldFromInput,
  submit,
  registerAction,
  token,
  isLoading,
  loginError
}) =>
  <div>
    {token
      ? <Redirect to="/clock" />
      : <div className="at-form" style={centerStyle}>
          <div className="at-title">
            <h3>Zarejestruj się</h3>
          </div>
          {!!isLoading && <div>Trwa rejestracja...</div>}
          {!isLoading &&
            <form onSubmit={submit}>
              <div className="at-input">
                <label htmlFor="name">Imię</label>
                <input
                  type="text"
                  name="name"
                  minLength={5}
                  value={fields.name}
                  onChange={changeFieldFromInput('name')}
                />
              </div>
              <div className="at-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  minLength={5}
                  value={fields.email}
                  onChange={changeFieldFromInput('email')}
                />
              </div>
              <div className="at-input">
                <label htmlFor="login">Login</label>
                <input
                  type="text"
                  name="login"
                  minLength={5}
                  value={fields.login}
                  onChange={changeFieldFromInput('login')}
                />
              </div>
              <div className="at-input">
                <label htmlFor="password">Hasło</label>
                <input
                  type="password"
                  name="password"
                  minLength={8}
                  value={fields.password}
                  onChange={changeFieldFromInput('password')}
                />
              </div>
              <button type="submit">Zarejestruj się</button>
            </form>}
        </div>}
    <Flash />
  </div>;

const emptyFields = { name: '', email: '', login: '', password: '' };

export default compose(
  connect(
    state => ({
      isLoading: isUserLoading(state),
      loginError: getLoginError(state),
      token: getUserToken(state)
    }),
    {
      registerAction: register
    }
  ),
  withState('fields', 'setFields', emptyFields),
  withHandlers({
    changeFieldFromInput: ({ setFields }) => field => event => {
      const value = event.target.value;
      return setFields(f => ({ ...f, [field]: value }));
    },
    submit: ({ registerAction, fields, setFields }) => ev => {
      ev.preventDefault();
      registerAction(fields.login, fields.password, fields.name, fields.email);
      setFields(emptyFields);
    }
  })
)(Register);
