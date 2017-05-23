import React from "react";
import { connect } from "react-redux";
import classNames from 'classnames';
import { updateExit as updateExitAction } from "../actions/";
import {
  getTimeselectTimestring,
  getExitOnSelectedDate,
  getTimeselectTimestamp,
  getEnterOnSelectedDate,
  getApiStatus
 } from '../selectors/';

const Icon = ({enter, status}) => 
  <i className={classNames('fa','fa-lg',(status?"fa-spin fa-refresh":(enter?"fa-pencil":"fa-sign-out")))} />

const ExitTime = (
  {
  timeString,
  enterTime,
  exitTime,
  selectTimestamp,
  updateExit,
  apiStatus
  }
) => (
  <div className="vertical">
    <p>
      Wyjście:&nbsp;
      {exitTime
        ? <span>{exitTime}</span>
        : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
    </p>
    <a onClick={() => updateExit(selectTimestamp)} className="button">
      <Icon enter={enterTime} status={apiStatus} />
      <br />
      {enterTime?"Jednak wyszedłem o:":"Wychodzę o:"}
      <br />
      {timeString}
    </a>
  </div>
);
const mapStateToProps = state => ({
  apiStatus: getApiStatus(state),
  timeString: getTimeselectTimestring(state),
  enterTime: getEnterOnSelectedDate(state),
  exitTime: getExitOnSelectedDate(state),
  selectTimestamp: getTimeselectTimestamp(state)
});
export default connect(mapStateToProps, {
  updateExit: updateExitAction,
})(ExitTime);
