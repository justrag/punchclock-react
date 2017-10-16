import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { resetPassword } from '../actions/';
import { isUserLoading, getUserToken } from '../selectors/';

const centerStyle = { textAlign: 'center' };

const ResetPassword = ({
  fields,
  changeFieldFromInput,
  submit,
  validate,
  resetPasswordAction,
  token,
  isLoading
}) =>
  <div>
    {token
      ? <Redirect to="/clock" />
      : <div className="at-form" style={centerStyle}>
          <div className="at-title">
            <h3>Reset hasła</h3>
          </div>
          {!!isLoading && <div>Chwileczkę...</div>}
          {!isLoading &&
            <form onSubmit={submit}>
              {!validate() && <p>Hasła nie pasują!</p>}
              <div className="at-input">
                <label htmlFor="password">Nowe hasło</label>
                <input
                  type="password"
                  name="password"
                  minLength={8}
                  value={fields.password}
                  onChange={changeFieldFromInput('password')}
                />
              </div>
              <div className="at-input">
                <label htmlFor="password2">Powtórz hasło</label>
                <input
                  type="password"
                  name="password2"
                  minLength={8}
                  value={fields.password2}
                  onChange={changeFieldFromInput('password2')}
                />
              </div>
              <button disabled={!validate()} type="submit">
                Zmień hasło
              </button>
              <div className="at-pwd-link">
                <p>
                  <NavLink to="/login" className="at-link at-pwd">
                    Zaloguj się
                  </NavLink>
                </p>
              </div>
            </form>}
        </div>}
  </div>;

const emptyFields = { password: '', password2: '' };

export default compose(
  connect(
    state => ({
      isLoading: isUserLoading(state),
      token: getUserToken(state)
    }),
    {
      resetPasswordAction: resetPassword
    }
  ),
  withState('fields', 'setFields', emptyFields),
  withHandlers({
    changeFieldFromInput: ({ setFields }) => field => event => {
      const value = event.target.value;
      return setFields(f => ({ ...f, [field]: value }));
    },
    validate: ({ fields }) => () => fields.password === fields.password2,
    submit: ({ resetPasswordAction, fields, setFields, match }) => ev => {
      //  props.match.params comes from ReactRouter:
      // <Route path="/resetpassword/:resetToken" component={ResetPassword} />
      ev.preventDefault();
      resetPasswordAction(match.params.resetToken, fields.password);
      setFields(emptyFields);
    }
  })
)(ResetPassword);
