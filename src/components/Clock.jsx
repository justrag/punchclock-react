import React, { Component } from "react";
import { connect } from "react-redux";
import DateSelect from "./DateSelect";
import ResetSelect from "./ResetSelect";
import TimeSelect from "./TimeSelect";
import EnterTime from "./EnterTime";
import ExitTime from "./ExitTime";
import ShiftLength from "./ShiftLength";
import { fetchIncident as fetchIncidentAction } from "../actions/";
import { getTimeselectTimestamp } from '../selectors/';
import { formatDate } from "../libs/timeFunctions";

class Clock extends Component {
/*
  constructor(props) {
    super(props);
  }
*/
  componentDidMount() { this.props.fetchIncident(this.props.selectedDate); }
  
  componentDidUpdate(prevProps) {
    if (prevProps.selectedDate !== this.props.selectedDate) {
      this.props.fetchIncident(this.props.selectedDate);
    };
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

const mapStateToProps = state => ({
  selectedDate: formatDate(getTimeselectTimestamp(state)),
});
export default connect(mapStateToProps, { fetchIncident: fetchIncidentAction })(Clock);
