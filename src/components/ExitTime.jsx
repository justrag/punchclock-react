import React from "react";
import { connect } from "react-redux";
import {
  exitChange as exitChangeAction,
  exit as exitAction
} from "../actions/";
import { getTimeselectString } from '../reducers/';

const ExitTime = (
  {
    exited,
    exitTime,
    timeString,
    notYetEntered,
    exitChange,
    exit
  }
) => (
  <div className="vertical">
    <p>
      Wyjście:
      {exited
        ? <span>{exitTime}</span>
        : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
    </p>
    {exited
      ? <a onClick={exitChange} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wyszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={exit} className="button" disabled={notYetEntered}>
          <i className="fa fa-lg fa-sign-out" /><br />Wychodzę o:<br />{timeString}
        </a>}
  </div>
);
const mapStateToProps = state => ({
  timeString: getTimeselectString(state),
  exited: state.day.exit, // bool if it exists
  exitTime: state.day.exit.time,
  notYetEntered: state.day.notYetEntered
});
export default connect(mapStateToProps, {
  exitChange: () => exitChangeAction(),
  exit: () => exitAction()
})(ExitTime);
