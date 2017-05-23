import React from 'react';
import { connect } from 'react-redux';
import { timeselectChangeHour, timeselectChangeMinute } from '../actions/';
import {
  getTimeselectHours, getTimeselectMinutes,
  getTimeselectPrevHour, getTimeselectPrevMinute,
  getTimeselectNextHour, getTimeselectNextMinute,
} from '../selectors/';

const TimeSelect = ({
  selectedMinute,
  selectedHour,
  nextMinute,
  prevMinute,
  nextHour,
  prevHour,
  changeHour,
  changeMinute,
}) => (
<div className="horizontal picker pickertime">
<div className="pickercolumn pickercolumnhours">
  <a onClick={() => changeHour(-1)}
  disabled={!prevHour}
  className="pickerbutton pickerbuttonup">
  {prevHour}
  </a>
<div className="pickercard">{selectedHour}:</div>
  <a onClick={() => changeHour(1)}
  disabled={!nextHour}
  className="pickerbutton pickerbuttondown">
  {nextHour}
  </a>
</div>
<div className="pickercolumn pickercolumnminutes">
  <a onClick={() => changeMinute(-1)}
  disabled={!prevMinute}  
  className="pickerbutton pickerbuttonup">
  {prevMinute}
  </a>
<div className="pickercard">{selectedMinute}</div>
  <a onClick={() => changeMinute(1)}
   disabled={!nextMinute} 
   className="pickerbutton pickerbuttondown">
   {nextMinute}
   </a>
</div>
</div>
);
const mapStateToProps = state => ({
  selectedMinute: getTimeselectMinutes(state),
  selectedHour: getTimeselectHours(state),
  nextMinute: getTimeselectNextMinute(state),
  prevMinute: getTimeselectPrevMinute(state),
  nextHour: getTimeselectNextHour(state),
  prevHour: getTimeselectPrevHour(state),
});
export default connect(mapStateToProps, {
  changeHour: timeselectChangeHour,
  changeMinute: timeselectChangeMinute,  
})(TimeSelect);
