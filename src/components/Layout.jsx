import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';
import { getUserLogin, getUserToken } from '../selectors/';
import { logOut as logOutAction } from '../actions/';
import Clock from './Clock';
import Stats from './Stats';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Flash from './Flash';
import logo from '../logo.svg';

const UserRoute = ({ token, component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      !!token
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login'
            }}
          />}
  />;

const logoStyle = {
  margin: '0 auto',
  padding: 0,
  border: 0,
  width: '10em',
  height: '10em'
};
const smallLogoStyle = {
  width: '3em',
  height: '3em'
};
const brandStyle = {
  backgroundColor: 'transparent',
  flex: '0 0 auto',
  boxShadow: 'none',
  alignSelf: 'center'
};

/*
import Settings from './Settings';

<NavLink to="/settings">
<i className="fa fa-cog" />
<br />Ustawienia
</NavLink>

<UserRoute token={token} path="/settings" component={Settings} />
*/

const Layout = ({ logOut, token, userName }) =>
  <Router>
    <div className="wrapper">
      {!!token &&
        <nav>
          <a style={brandStyle} href="https://odbijsie.pl">
            <img src={logo} style={smallLogoStyle} alt="small logo" />
          </a>
          <NavLink to="/clock">
            <i className="fa fa-clock-o" />
            <br />Zegar
          </NavLink>
          <NavLink to="/stats">
            <i className="fa fa-calendar" />
            <br />Statystyki
          </NavLink>
          <a onClick={logOut}>
            <i className="fa fa-power-off" />
            <br />Wyloguj: {userName}
          </a>
        </nav>}
      {!token &&
        <nav>
          <img src={logo} style={logoStyle} alt="logo" />
        </nav>}
      <section>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetpassword/:resetToken" component={ResetPassword} />
          <UserRoute token={token} path="/clock" component={Clock} />
          <UserRoute token={token} path="/stats" component={Stats} />
          <Redirect from="/" to="/clock" />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </section>
      <footer>
        <Flash />
      </footer>
    </div>
  </Router>;

/*
const Layout = ({ logOut, token, userName }) => (
  <Router>
    {!token
      ? <div className="wrapper"><Login /></div>
      : <div className="wrapper">
          <nav>
            <NavLink to="/clock">
              <i className="fa fa-clock-o" /><br />Zegar
            </NavLink>
            <NavLink to="/stats">
              <i className="fa fa-calendar" /><br />Statystyki
            </NavLink>
            <NavLink to="/settings">
              <i className="fa fa-cog" /><br />Ustawienia
            </NavLink>
            <a onClick={logOut}>
              <i className="fa fa-power-off" /><br />Wyloguj: {userName}
            </a>
          </nav>
          <section>
          <Switch>
              <Route path="/clock" component={Clock} />
              <Route path="/stats" component={Stats} />
              <Route path="/settings" component={Settings} />
              <Redirect from="/" to="/clock" />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </section>
          <footer>
            <p>Bardzo</p><p>Ciekawa</p><p>Reklama</p>
          </footer>
        </div>}
  </Router>
);
*/
const mapStateToProps = state => ({
  token: getUserToken(state),
  userName: getUserLogin(state)
});
/*
export default withRouter(connect(mapStateToProps, {
  logOut: () => logOutAction()
})(Layout));
*/
export default connect(mapStateToProps, {
  logOut: () => logOutAction()
})(Layout);
