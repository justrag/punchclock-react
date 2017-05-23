import React from "react";
import { connect } from "react-redux";
import classNames from 'classnames';
import { saveIncident as saveIncidentAction } from "../actions/";
import {
  getTimeselectTimestring,
  getEnterOnSelectedDate,
  getTimeselectTimestamp,
  getTimeselectShiftlength,
  getApiStatus
} from "../selectors/";

const Icon = ({enter, status}) => 
  <i className={classNames('fa','fa-lg',(status?"fa-spin fa-refresh":(enter?"fa-pencil":"fa-sign-in")))} />

const EnterTime = (
  {
    enterTime,
    selectTimestamp,
    selectShiftlength,
    timeString,
    saveIncident,
    apiStatus
  }
) => (
  <div className="vertical">
    <p>
      Wejście:&nbsp;
      <span>
        {enterTime ? enterTime : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
      </span>
    </p>
    <a onClick={() => saveIncident(selectTimestamp, selectShiftlength)} className="button">
      <Icon enter={enterTime} status={apiStatus} />
      <br />
      {enterTime?"Jednak wszedłem o:":"Wchodzę o:"}
      <br />
      {timeString}
    </a>
  </div>
);
const mapStateToProps = state => ({
  apiStatus: getApiStatus(state),
  enterTime: getEnterOnSelectedDate(state),
  selectTimestamp: getTimeselectTimestamp(state),
  selectShiftlength: getTimeselectShiftlength(state),
  timeString: getTimeselectTimestring(state)
});
export default connect(mapStateToProps, {
  saveIncident: saveIncidentAction
})(EnterTime);
