import React from "react";
import { connect } from "react-redux";
import { enterChange as enterChangeAction, enter as enterAction } from '../actions/';

const EnterTime = (
  {
    enterChange,
    enter,
    didEnterToday,
    enterTime,
    timeString
  }
) => (
  <div className="vertical">
    <p>
      Wejście:
      <span>
        {didEnterToday ? enterTime : <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>}
      </span>
    </p>
    {didEnterToday
      ? <a onClick={enterChange} className="button">
          <i className="fa fa-lg fa-pencil" />
          <br />
          Jednak wszedłem o:
          <br />
          {timeString}
        </a>
      : <a onClick={enter} className="button">
          <i className="fa fa-lg fa-sign-in" /><br />Wchodzę o:<br />{timeString}
        </a>}
  </div>
);
const mapStateToProps = state => ({
  enterTime: state.day.enterTime,
  didEnterToday: state.day, //bool if it exists
  timeString: state.timeselect.timeString,
});
export default connect(mapStateToProps, {
  enterChange: () => enterChangeAction(),
  enter: () => enterAction(),
})(EnterTime);
