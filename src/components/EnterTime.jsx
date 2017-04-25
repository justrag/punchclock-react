import React from "react";
import { connect } from "react-redux";
import { saveIncident as saveIncidentAction } from "../actions/";
import {
  getTimeselectTimestring,
  getEnterOnSelectedDate,
  getTimeselectTimestamp,
  getTimeselectShiftlength
} from "../reducers/";

const EnterTime = (
  {
    enterTime,
    selectTimestamp,
    selectShiftlength,
    timeString,
    saveIncident
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
      ? <a onClick={() => saveIncident(selectTimestamp, selectShiftlength)} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={() => saveIncident(selectTimestamp, selectShiftlength)} className="button">
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
  selectShiftlength: getTimeselectShiftlength(state),
  timeString: getTimeselectTimestring(state)
});
export default connect(mapStateToProps, {
  saveIncident: saveIncidentAction
})(EnterTime);
