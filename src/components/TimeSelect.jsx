import React from 'react';
import { connect } from 'react-redux';
import { HOURS, MINUTES, PLUS, MINUS} from '../constants/';
import { timeSelectChange as timeSelectChangeAction } from '../actions/';

const TimeSelect = ({
  parts,
  limits,
  next,
  prev,
  timeSelectChange,
}) => (
<div className="horizontal picker pickertime">
<div className="pickercolumn pickercolumnhours">
  <a onClick={() => timeSelectChange(HOURS,MINUS)}
  disabled={limits.hours.first}
  className="pickerbutton pickerbuttonup">
  {prev.hours}
  </a>
<div className="pickercard">{parts.hours}:</div>
  <a onClick={() => timeSelectChange(HOURS,PLUS)}
  disabled={limits.hours.last}
  className="pickerbutton pickerbuttondown">
  {next.hours}
  </a>
</div>
<div className="pickercolumn pickercolumnminutes">
  <a onClick={() => timeSelectChange(MINUTES,MINUS)}
  disabled={limits.minutes.first}  
  className="pickerbutton pickerbuttonup">
  {prev.minutes}
  </a>
<div className="pickercard">{parts.minutes}</div>
  <a onClick={() => timeSelectChange(MINUTES,PLUS)}
   disabled={limits.minutes.last} 
   className="pickerbutton pickerbuttondown">
   {next.minutes}
   </a>
</div>
</div>
);
const mapStateToProps = state => ({
  parts: state.timeselect.parts,
  limits: state.timeselect.limits,
  next: state.timeselect.next,
  prev: state.timeselect.prev,
});
export default connect(mapStateToProps, {
  timeSelectChange: timeSelectChangeAction,
})(TimeSelect);
