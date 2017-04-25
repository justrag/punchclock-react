import React from "react";
import { connect } from "react-redux";
import { updateExit as updateExitAction } from "../actions/";
import {
  getTimeselectTimestring,
  getExitOnSelectedDate,
  getTimeselectTimestamp,
  getEnterOnSelectedDate
 } from '../reducers/';

const ExitTime = (
  {
  timeString,
  enterTime,
  exitTime,
  selectTimestamp,
  updateExit,
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
      ? <a onClick={() => updateExit(selectTimestamp)} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wyszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={() => updateExit(selectTimestamp)} className="button" disabled={!enterTime}>
          <i className="fa fa-lg fa-sign-out" /><br />Wychodzę o:<br />{timeString}
        </a>}
  </div>
);
const mapStateToProps = state => ({
  timeString: getTimeselectTimestring(state),
  enterTime: getEnterOnSelectedDate(state),
  exitTime: getExitOnSelectedDate(state),
  selectTimestamp: getTimeselectTimestamp(state)
});
export default connect(mapStateToProps, {
  updateExit: updateExitAction,
})(ExitTime);
