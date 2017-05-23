import React from "react";
import { connect } from "react-redux";
import {
  timeselectChangeDay,
  timeselectChangeDate,
  timeselectChangeMonth,
  timeselectChangeYear,
 } from "../actions/";
import {
getTimeselectDate,
getTimeselectMonths,
getTimeselectYears,
isTimeselectFirstDay,
isTimeselectLastDay,
getTimeselectPrevDate,
getTimeselectPrevMonth,
getTimeselectPrevYear,
getTimeselectNextDate,
getTimeselectNextMonth,
getTimeselectNextYear,
} from '../selectors/';

const DateSelect = (
  {
  selectedDate,
  selectedMonth,
  selectedYear,
  isFirstDay,
  isLastDay,
  prevDate,
  prevMonth,
  prevYear,
  nextDate,
  nextMonth,
  nextYear,
  changeDay,
  changeDate,
  changeMonth,
  changeYear,
  }
) => (
  <div className="horizontal picker pickerdate">
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => changeDay(-1)}
        disabled={isFirstDay}
        className="pickerbutton pickerbuttonleft"
      >
        <i className="fa fa-lg fa-chevron-left" />
      </a>
    </div>
    <div className="pickercolumn pickercolumndate">
      <a
        onClick={() => changeDate(-1)}
        disabled={!prevDate}
        className="pickerbutton pickerbuttonup"
      >
        {prevDate}
      </a>
      <div className="pickercard">{selectedDate}</div>
      <a
        onClick={() => changeDate(1)}
        disabled={!nextDate}
        className="pickerbutton pickerbuttondown"
      >
        {nextDate}
      </a>
    </div>
    <div className="pickercolumn pickercolumnmonths">
      <a
        onClick={() => changeMonth(-1)}
        disabled={!prevMonth}
        className="pickerbutton pickerbuttonup"
      >
        {prevMonth}
      </a>
      <div className="pickercard">{selectedMonth}</div>
      <a
        onClick={() => changeMonth(1)}
        disabled={!nextMonth}
        className="pickerbutton pickerbuttondown"
      >
        {nextMonth}
      </a>
    </div>
    <div className="pickercolumn pickercolumnyears">
      <a
        onClick={() => changeYear(-1)}
        disabled={!prevYear}
        className="pickerbutton pickerbuttonup"
      >
        {prevYear}
      </a>
      <div className="pickercard">{selectedYear}</div>
      <a
        onClick={() => changeYear(1)}
        disabled={!nextYear}
        className="pickerbutton pickerbuttondown"
      >
        {nextYear}
      </a>
    </div>
    <div className="pickercolumn pickercolumnday">
      <a
        onClick={() => changeDay(1)}
        disabled={isLastDay}
        className="pickerbutton pickerbuttonright"
      >
        <i className="fa fa-lg fa-chevron-right" />
      </a>
    </div>
  </div>
);
const mapStateToProps = state => ({
  selectedDate: getTimeselectDate(state),
  selectedMonth: getTimeselectMonths(state),
  selectedYear: getTimeselectYears(state),
  isFirstDay: isTimeselectFirstDay(state),
  isLastDay: isTimeselectLastDay(state),
  prevDate: getTimeselectPrevDate(state),
  prevMonth: getTimeselectPrevMonth(state),
  prevYear: getTimeselectPrevYear(state),
  nextDate: getTimeselectNextDate(state),
  nextMonth: getTimeselectNextMonth(state),
  nextYear: getTimeselectNextYear(state),
});
export default connect(mapStateToProps, {
  changeDay: timeselectChangeDay,
  changeDate: timeselectChangeDate,
  changeMonth: timeselectChangeMonth,
  changeYear: timeselectChangeYear,
})(DateSelect);
