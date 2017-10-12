import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { forgotPassword } from '../actions/';
import {
  isUserLoading,
  getLoginError,
  getUserToken,
  getResetPasswordSent
} from '../selectors/';
import Flash from './Flash';

const centerStyle = { textAlign: 'center' };

const ForgotPassword = ({
  fields,
  changeFieldFromInput,
  submit,
  forgotPasswordAction,
  token,
  isLoading,
  loginError,
  resetPasswordSent
}) =>
  <div>
    {token
      ? <Redirect to="/clock" />
      : <div className="at-form" style={centerStyle}>
          <div className="at-title">
            <h3>Zapomniałeś hasła?</h3>
          </div>
          {!!isLoading && <div>Chwileczkę...</div>}
          {!isLoading &&
            <form onSubmit={submit}>
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
              <button type="submit">Wyślij email z kodem</button>
            </form>}
          <Flash />
          {!!loginError &&
            <div className="danger at-error">
              <div>
                <strong>Błąd komunikacji.</strong>
              </div>
            </div>}
          {!!resetPasswordSent &&
            <div className="at-title">
              <div>
                <strong>Kod do zmiany hasła posłano na podany email.</strong>
              </div>
            </div>}
        </div>}
  </div>;

const emptyFields = { email: '' };

export default compose(
  connect(
    state => ({
      isLoading: isUserLoading(state),
      loginError: getLoginError(state),
      token: getUserToken(state),
      resetPasswordSent: getResetPasswordSent(state)
    }),
    {
      forgotPasswordAction: forgotPassword
    }
  ),
  withState('fields', 'setFields', emptyFields),
  withHandlers({
    changeFieldFromInput: ({ setFields }) => field => event => {
      const value = event.target.value;
      return setFields(f => ({ ...f, [field]: value }));
    },
    submit: ({ forgotPasswordAction, fields, setFields }) => ev => {
      ev.preventDefault();
      forgotPasswordAction(fields.email);
      setFields(emptyFields);
    }
  })
)(ForgotPassword);
