import React from "react";
import { connect } from "react-redux";
import { timeselectChange as timeselectChangeAction } from "../actions/";
import { DATE, DAYS, MONTHS, YEARS, PLUS, MINUS } from '../constants/';
import { getTimeselectDate, getTimeselectMonths, getTimeselectYears,
  getTimeselectLimits, getTimeselectPrev, getTimeselectNext } from '../reducers/';

const DateSelect = (
  {
  timeselectDate,
  timeselectMonths,
  timeselectYears,
    timeselectChange,
    limits,
    next,
    prev
  }
) => (
  <div className="horizontal picker pickerdate">
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => timeselectChange(DAYS,MINUS)}
        disabled={limits[DAYS].first}
        className="pickerbutton pickerbuttonleft"
      >
        <i className="fa fa-lg fa-chevron-left" />
      </a>
    </div>
    <div className="pickercolumn pickercolumndate">
      <a
        onClick={() => timeselectChange(DATE,MINUS)}
        disabled={limits[DATE].first}
        className="pickerbutton pickerbuttonup"
      >
        {prev[DATE]}
      </a>
      <div className="pickercard">{timeselectDate}</div>
      <a
        onClick={() => timeselectChange(DATE,PLUS)}
        disabled={limits[DATE].last}
        className="pickerbutton pickerbuttondown"
      >
        {next[DATE]}
      </a>
    </div>
    <div className="pickercolumn pickercolumnmonths">
      <a
        onClick={() => timeselectChange(MONTHS,MINUS)}
        disabled={limits[MONTHS].first}
        className="pickerbutton pickerbuttonup"
      >
        {prev[MONTHS]}
      </a>
      <div className="pickercard">{timeselectMonths}</div>
      <a
        onClick={() => timeselectChange(MONTHS,PLUS)}
        disabled={limits[MONTHS].last}
        className="pickerbutton pickerbuttondown"
      >
        {next[MONTHS]}
      </a>
    </div>
    <div className="pickercolumn pickercolumnyears">
      <a
        onClick={() => timeselectChange(YEARS,MINUS)}
        disabled={limits[YEARS].first}
        className="pickerbutton pickerbuttonup"
      >
        {prev[YEARS]}
      </a>
      <div className="pickercard">{timeselectYears}</div>
      <a
        onClick={() => timeselectChange(YEARS,PLUS)}
        disabled={limits[YEARS].last}
        className="pickerbutton pickerbuttondown"
      >
        {next[YEARS]}
      </a>
    </div>
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => timeselectChange(DAYS,PLUS)}
        disabled={limits[DAYS].last}
        className="pickerbutton pickerbuttonright"
      >
        <i className="fa fa-lg fa-chevron-right" />
      </a>
    </div>
  </div>
);
const mapStateToProps = state => ({
  timeselectDate: getTimeselectDate(state),
  timeselectMonths: getTimeselectMonths(state),
  timeselectYears: getTimeselectYears(state),
  limits: getTimeselectLimits(state),
  prev: getTimeselectPrev(state),
  next: getTimeselectNext(state),
});
export default connect(mapStateToProps, {
  timeselectChange: timeselectChangeAction
})(DateSelect);
