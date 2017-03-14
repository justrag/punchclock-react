import React from 'react';
import { connect } from 'react-redux';
import { timeSelectReset as timeSelectResetAction} from '../actions/';

const ResetSelect = ({
  timeSelectReset,
  notSelected,
  clockFaceDisplay,
}) => (
<a onClick={timeSelectReset} className="button" disabled={notSelected}>
<i className="fa fa-refresh"></i><br />{clockFaceDisplay}
</a>
);
const mapStateToProps = state => ({
  notSelected: state.timeselect.notSelected,
  clockFaceDisplay: state.clockface.display, 
});
export default connect(mapStateToProps, {timeSelectReset: () => timeSelectResetAction()})(ResetSelect);
