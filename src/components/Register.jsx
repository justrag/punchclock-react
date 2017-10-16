import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/';
import { isUserLoading, getUserToken } from '../selectors/';

const centerStyle = { textAlign: 'center' };

const Register = ({
  fields,
  changeFieldFromInput,
  submit,
  validate,
  registerAction,
  token,
  isLoading
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
              {!validate() && <p>Hasła nie pasują!</p>}
              <div className="at-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  minLength={1}
                  value={fields.email}
                  onChange={changeFieldFromInput('email')}
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
              <div className="at-input">
                <label htmlFor="password">Powtórz hasło</label>
                <input
                  type="password"
                  name="password2"
                  minLength={8}
                  value={fields.password2}
                  onChange={changeFieldFromInput('password2')}
                />
              </div>
              <button disabled={!validate()} type="submit">
                Zarejestruj się
              </button>
            </form>}
        </div>}
  </div>;

const emptyFields = { email: '', password: '', password2: '' };

export default compose(
  connect(
    state => ({
      isLoading: isUserLoading(state),
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
    validate: ({ fields }) => () => fields.password === fields.password2,
    submit: ({ registerAction, fields, setFields }) => ev => {
      ev.preventDefault();
      registerAction(fields.login, fields.password, fields.name, fields.email);
      setFields(emptyFields);
    }
  })
)(Register);
