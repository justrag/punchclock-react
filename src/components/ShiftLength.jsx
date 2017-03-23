import React from 'react';
import { connect } from 'react-redux';
import {
  shiftlengthIncrease as shiftlengthIncreaseAction,
  shiftlengthDecrease as shiftlengthDecreaseAction
} from '../actions/';
import { getShiftLength, isTimeselectToday } from '../reducers/';

const ShiftLength = ({
  shiftlengthIncrease,
  shiftlengthDecrease,
  shiftLength,
  exited,
  workTime,
  entered,
  isItToday,
  gone,
  absText,
}) => (
  <div className="vertical topalign">
      <a onClick={shiftlengthDecrease} className="button"><i className="fa fa-lg fa-minus"></i></a>
  <p>Dniówka: {shiftLength} godzin</p>
      <a onClick={shiftlengthIncrease} className="button"><i className="fa fa-lg fa-plus"></i></a>
      { exitTime ?
       (<p>Czas pracy: <span>{workTime}</span></p>)
       :
( ( enterTime && isItToday && gone ) ?
  (<p>Pora do domu: <span>{absText}</span> temu</p>)
 : 
  (<p>Pora do domu za: <span>{absText}</span></p>)
  ) 
}
</div>
);
const mapStateToProps = state => ({
  shiftLength: getShiftlength(state),
  isItToday: isTimeselectToday(state),
  enterTime: getEnterOnSelectedDate(state),
  exitTime: getExitOnSelectedDate(state),

  workTime: state.day.work.time,
  gone: state.timeleft.gone,
  absText: state.timeleft.absText,
});
export default connect(mapStateToProps, {
  shiftlengthIncrease: () => shiftlengthIncreaseAction(),
  shiftlengthDecrease: () => shiftlengthDecreaseAction(),
   })(ShiftLength);