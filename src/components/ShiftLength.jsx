import React from "react";
import { connect } from "react-redux";
import classNames from 'classnames';
import {
  timeselectShiftlengthIncrease as shiftlengthIncreaseAction,
  timeselectShiftlengthDecrease as shiftlengthDecreaseAction,
  updateShiftlength as updateShiftlengthAction
} from "../actions/";
import {
  getTimeselectShiftlength,
  isTimeselectToday,
  getEnterOnSelectedDate,
  getExitOnSelectedDate,
  getWorktimeForSelectedDate,
  isOvertime,
  getAbsTimeTillLeave,
  getTimeselectTimestamp,
  getApiStatus
} from "../reducers/";

const Icon = ({status}) => 
  <i className={classNames('fa','fa-lg',(status?"fa-spin fa-refresh":"fa-pencil"))} />

const ShiftLength = (
  {
    shiftLength,
    isItToday,
    enterTime,
    exitTime,
    workTime,
    overtime,
    timeLeft,
    shiftlengthIncrease,
    shiftlengthDecrease,
    updateShiftlength,
    selectTimestamp,
    apiStatus
  }
) => (
  <div className="vertical topalign">
    <a onClick={() => shiftlengthDecrease()} className="button">
      <i className="fa fa-lg fa-minus" />
    </a>
<a onClick={() => updateShiftlength(selectTimestamp, shiftLength)} className="button">
          <Icon status={apiStatus} />
          <br />
          Dzisiaj pracuję:
          <br />
          {shiftLength} godzin
        </a>
    <a onClick={() => shiftlengthIncrease()} className="button">
      <i className="fa fa-lg fa-plus" />
    </a>
    {enterTime && exitTime && <p>Czas pracy: <span>{workTime}</span></p>}
    {enterTime && !exitTime && isItToday && overtime && <p>Pora do domu: <span>{timeLeft}</span> temu</p>}
    {enterTime && !exitTime && isItToday && !overtime && <p>Pora do domu za: <span>{timeLeft}</span></p>}
  </div>
);
const mapStateToProps = state => ({
  apiStatus: getApiStatus(state),
  shiftLength: getTimeselectShiftlength(state),
  isItToday: isTimeselectToday(state),
  enterTime: getEnterOnSelectedDate(state),
  exitTime: getExitOnSelectedDate(state),
  workTime: getWorktimeForSelectedDate(state),
  overtime: isOvertime(state),
  timeLeft: getAbsTimeTillLeave(state),
  selectTimestamp: getTimeselectTimestamp(state)
});
export default connect(mapStateToProps, {
  shiftlengthIncrease: shiftlengthIncreaseAction,
  shiftlengthDecrease: shiftlengthDecreaseAction,
  updateShiftlength: updateShiftlengthAction
})(ShiftLength);
