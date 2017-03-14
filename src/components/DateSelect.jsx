import React from "react";
import { connect } from "react-redux";
import { timeSelectChange as timeSelectChangeAction } from "../actions/";
import { DATE, DAYS, MONTHS, YEARS, PLUS, MINUS } from '../constants/';

const DateSelect = (
  {
    timeSelectChange,
    limits,
    parts,
    next,
    prev
  }
) => (
  <div className="horizontal picker pickerdate">
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => timeSelectChange(DAYS,MINUS)}
        disabled={limits.day.first}
        className="pickerbutton pickerbuttonleft"
      >
        <i className="fa fa-lg fa-chevron-left" />
      </a>
    </div>
    <div className="pickercolumn pickercolumndate">
      <a
        onClick={() => timeSelectChange(DATE,MINUS)}
        disabled={limits.date.first}
        className="pickerbutton pickerbuttonup"
      >
        {prev.date}
      </a>
      <div className="pickercard">{parts.date}</div>
      <a
        onClick={() => timeSelectChange(DATE,PLUS)}
        disabled={limits.date.last}
        className="pickerbutton pickerbuttondown"
      >
        {next.date}
      </a>
    </div>
    <div className="pickercolumn pickercolumnmonths">
      <a
        onClick={() => timeSelectChange(MONTHS,MINUS)}
        disabled={limits.months.first}
        className="pickerbutton pickerbuttonup"
      >
        {prev.months}
      </a>
      <div className="pickercard">{parts.months}</div>
      <a
        onClick={() => timeSelectChange(MONTHS,PLUS)}
        disabled={limits.months.last}
        className="pickerbutton pickerbuttondown"
      >
        {next.months}
      </a>
    </div>
    <div className="pickercolumn pickercolumnyears">
      <a
        onClick={() => timeSelectChange(YEARS,MINUS)}
        disabled={limits.years.first}
        className="pickerbutton pickerbuttonup"
      >
        {prev.years}
      </a>
      <div className="pickercard">{parts.years}</div>
      <a
        onClick={() => timeSelectChange(YEARS,PLUS)}
        disabled={limits.years.last}
        className="pickerbutton pickerbuttondown"
      >
        {next.years}
      </a>
    </div>
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => timeSelectChange(DAYS,PLUS)}
        disabled={limits.day.last}
        className="pickerbutton pickerbuttonright"
      >
        <i className="fa fa-lg fa-chevron-right" />
      </a>
    </div>
  </div>
);
const mapStateToProps = state => ({
  limits: state.timeselect.limits,
  parts: state.timeselect.parts,
  prev: state.timeselect.prev,
  next: state.timeselect.next,
});
export default connect(mapStateToProps, {
  timeSelectChange: timeSelectChangeAction
})(DateSelect);
