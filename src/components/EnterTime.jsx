import React from "react";
import { connect } from "react-redux";
import { incidentSetEnter as incidentSetEnterAction } from "../actions/";
import {
  getTimeselectTimestring,
  getEnterOnSelectedDate,
  getTimeselectTimestamp
} from "../reducers/";

const EnterTime = (
  {
    enterTime,
    selectTimestamp,
    timeString,
    incidentSetEnter
  }
) => (
  <div className="vertical">
    <p>
      Wejście:
      <span>
        {enterTime ? enterTime : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
      </span>
    </p>
    {enterTime
      ? <a onClick={() => incidentSetEnter(selectTimestamp)} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={() => incidentSetEnter(selectTimestamp)} className="button">
          <i className="fa fa-lg fa-sign-in" />
          <br />
          Wchodzę o:
          <br />
          {timeString}
        </a>}
  </div>
);
const mapStateToProps = state => ({
  enterTime: getEnterOnSelectedDate(state),
  selectTimestamp: getTimeselectTimestamp(state),
  timeString: getTimeselectTimestring(state)
});
export default connect(mapStateToProps, {
  incidentSetEnter: incidentSetEnterAction
})(EnterTime);
