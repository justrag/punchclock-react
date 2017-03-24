import React from "react";
import { connect } from "react-redux";
import { incidentSetExit as incidentSetExitAction } from "../actions/";
import {
  getTimeselectTimestring,
  getExitOnSelectedDate,
  getTimeselectTimestamp,
  getEnterOnSelectedDate,
  getTimeselectShiftlength,
 } from '../reducers/';

const ExitTime = (
  {
  timeString,
  enterTime,
  exitTime,
  selectTimestamp,
  shiftLength,
  incidentSetExit,
  }
) => (
  <div className="vertical">
    <p>
      Wyjście:
      {exitTime
        ? <span>{exitTime}</span>
        : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
    </p>
    {exitTime
      ? <a onClick={() => incidentSetExit(selectTimestamp,shiftLength)} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wyszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={() => incidentSetExit(selectTimestamp,shiftLength)} className="button" disabled={!enterTime}>
          <i className="fa fa-lg fa-sign-out" /><br />Wychodzę o:<br />{timeString}
        </a>}
  </div>
);
const mapStateToProps = state => ({
  timeString: getTimeselectTimestring(state),
  enterTime: getEnterOnSelectedDate(state),
  exitTime: getExitOnSelectedDate(state),
  selectTimestamp: getTimeselectTimestamp(state),
  shiftLength: getTimeselectShiftlength(state)
});
export default connect(mapStateToProps, {
  incidentSetExit: incidentSetExitAction,
})(ExitTime);
