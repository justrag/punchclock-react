import React from 'react';
import { connect } from 'react-redux';
import { HOURS, MINUTES, PLUS, MINUS} from '../constants/';
import { timeselectChange as timeselectChangeAction } from '../actions/';
import { getTimeselectHours, getTimeselectMinutes, getTimeselectLimits, getTimeselectPrev, getTimeselectNext } from '../reducers/';

const TimeSelect = ({
  timeselectHours,
  timeselectMinutes,
  limits,
  next,
  prev,
  timeselectChange,
}) => (
<div className="horizontal picker pickertime">
<div className="pickercolumn pickercolumnhours">
  <a onClick={() => timeselectChange(HOURS,MINUS)}
  disabled={limits[HOURS].first}
  className="pickerbutton pickerbuttonup">
  {prev[HOURS]}
  </a>
<div className="pickercard">{timeselectHours}:</div>
  <a onClick={() => timeselectChange(HOURS,PLUS)}
  disabled={limits[HOURS].last}
  className="pickerbutton pickerbuttondown">
  {next[HOURS]}
  </a>
</div>
<div className="pickercolumn pickercolumnminutes">
  <a onClick={() => timeselectChange(MINUTES,MINUS)}
  disabled={limits[MINUTES].first}  
  className="pickerbutton pickerbuttonup">
  {prev[MINUTES]}
  </a>
<div className="pickercard">{timeselectMinutes}</div>
  <a onClick={() => timeselectChange(MINUTES,PLUS)}
   disabled={limits[MINUTES].last} 
   className="pickerbutton pickerbuttondown">
   {next[MINUTES]}
   </a>
</div>
</div>
);
const mapStateToProps = state => ({
  timeselectHours: getTimeselectHours(state),
  timeselectMinutes: getTimeselectMinutes(state),
  limits: getTimeselectLimits(state),
  prev: getTimeselectPrev(state),
  next: getTimeselectNext(state),
});
export default connect(mapStateToProps, {
  timeselectChange: timeselectChangeAction,
})(TimeSelect);
