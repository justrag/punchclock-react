import React, { Component } from "react";
import { connect } from "react-redux";
import DateSelect from "./DateSelect";
import ResetSelect from "./ResetSelect";
import TimeSelect from "./TimeSelect";
import EnterTime from "./EnterTime";
import ExitTime from "./ExitTime";
import ShiftLength from "./ShiftLength";
import { getIncident as getIncidentAction } from "../actions/";
import { getTimeselectTimestamp } from '../reducers/';
import { formatDate } from "../libs/timeFunctions";

class Clock extends Component {
  constructor(props) {
    super(props);
//    this.state = {date: new Date()};
  }

  componentDidMount() { this.props.getIncident(this.props.selectedDate); }

  componentDidUpdate(nextProps) {
//    console.debug("old: %o, new: %o",this.props.selectedDate,nextProps.selectedDate);
    if (nextProps.selectedDate !== this.props.selectedDate) this.props.getIncident(nextProps.selectedDate);
  }

  render() {
    return (
    <div>
      <div className="horizontal">
        <DateSelect />
        <ResetSelect />
      </div>
      <div className="horizontal">
        <EnterTime />
        <ShiftLength />
        <ExitTime />
      </div>
      <TimeSelect />
    </div>
  );
}

};

/*
const Clock = ({selectTimestamp}) => (
  <div>
    <div className="horizontal">
      <DateSelect />
      <ResetSelect />
    </div>
    <div className="horizontal">
      <EnterTime />
      <ShiftLength />
      <ExitTime />
    </div>
    <TimeSelect />
  </div>
);
*/
const mapStateToProps = state => ({
  selectedDate: formatDate(getTimeselectTimestamp(state)),
});
export default connect(mapStateToProps, { getIncident: getIncidentAction })(Clock);
