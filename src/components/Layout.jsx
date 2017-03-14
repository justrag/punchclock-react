import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Clock from "./Clock";
/* import Stats from "./Stats"; */
import Settings from "./Settings";
import { logOut as logOutAction } from "../actions/";

const Stats = () => (<div>Stats</div>);

const Layout = ({logOut, userNotLoggedIn, userShortName}) => (
  <Router>
    <div className="wrapper">
      <nav>
        <NavLink to="/clock"><i className="fa fa-clock-o" /><br />Zegar</NavLink>
        <NavLink to="/stats">
          <i className="fa fa-calendar" /><br />Statystyki
        </NavLink>
        <NavLink to="/settings">
          <i className="fa fa-cog" /><br />Ustawienia
        </NavLink>
        <a onClick={logOut} disabled={userNotLoggedIn}>
          <i className="fa fa-power-off" /><br />Wyloguj: {userShortName}
        </a>
      </nav>
      <section>
        <Route path="/clock" component={Clock} />
        <Route path="/stats" component={Stats} />
        <Route path="/settings" component={Settings} />
      </section>
      <footer>
        <p>Bardzo</p><p>Ciekawa</p><p>Reklama</p>
      </footer>
    </div>
  </Router>
);
const mapStateToProps = state => ({
  userNotLoggedIn: true,
  userShortName: "johny"
});
export default connect(mapStateToProps, { logOut: logOutAction })(Layout);
