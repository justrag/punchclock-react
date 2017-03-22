import React from "react";
import { connect } from "react-redux";
import { timeselectReset as timeselectResetAction } from "../actions/";
import { getTimeselectSelected, getClockfaceDisplay } from "../reducers/";

const ResetSelect = (
  {
    timeselectReset,
    selected,
    display
  }
) => (
  <a onClick={timeselectReset} className="button" disabled={!selected}>
    <i className="fa fa-refresh" /><br />{display}
  </a>
);
const mapStateToProps = state => ({
  selected: getTimeselectSelected(state),
  display: getClockfaceDisplay(state)
});
export default connect(mapStateToProps, {
  timeselectReset: () => timeselectResetAction(),
})(ResetSelect);
