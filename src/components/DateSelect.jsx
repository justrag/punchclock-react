import React from 'react';

const DateSelect = ({
  TIMESELECT_CHANGED,
  Timeselect.limits.day.first,
  Timeselect.limits.day.last,
  Timeselect.limits.date.first,
  Timeselect.limits.date.last,
  Timeselect.limits.months.first,
  Timeselect.limits.months.last,
  Timeselect.limits.years.first,
  Timeselect.limits.years.last,
Timeselect.parts.date,
Timeselect.parts.months,
Timeselect.parts.years,
}) => (
<div class="horizontal picker pickerdate">
<div class="pickercolumn pickercolumnday">
  <a dispatch="TIMESELECT_CHANGED" data-date-field="day" data-direction="minus" disabled={{Timeselect.limits.day.first}} class="pickerbutton pickerbuttonleft"><i class="fa fa-lg fa-chevron-left"></i></a>
</div>
<div class="pickercolumn pickercolumndate">
  <a dispatch="TIMESELECT_CHANGED" data-date-field="date" data-direction="minus" disabled={{Timeselect.limits.date.first}}  class="pickerbutton pickerbuttonup">{{Timeselect.prev.date}}</a>
<div class="pickercard">{{Timeselect.parts.date}}</div>
<a dispatch="TIMESELECT_CHANGED" data-date-field="date" data-direction="plus" disabled={{Timeselect.limits.date.last}} class="pickerbutton pickerbuttondown">{{Timeselect.next.date}}</a>
</div>
<div class="pickercolumn pickercolumnmonths">
  <a dispatch="TIMESELECT_CHANGED" data-date-field="months" data-direction="minus" disabled={{Timeselect.limits.months.first}} class="pickerbutton pickerbuttonup">{{Timeselect.prev.months}}</a>
<div class="pickercard">{{Timeselect.parts.months}}</div>
  <a dispatch="TIMESELECT_CHANGED" data-date-field="months" data-direction="plus" disabled={{Timeselect.limits.months.last}} class="pickerbutton pickerbuttondown">{{Timeselect.next.months}}</a>
</div>
<div class="pickercolumn pickercolumnyears">
  <a dispatch="TIMESELECT_CHANGED" data-date-field="years" data-direction="minus" disabled={{Timeselect.limits.years.first}} class="pickerbutton pickerbuttonup">{{Timeselect.prev.years}}</a>
<div class="pickercard">{{Timeselect.parts.years}}</div>
  <a dispatch="TIMESELECT_CHANGED" data-date-field="years" data-direction="plus" disabled={{Timeselect.limits.years.last}} class="pickerbutton pickerbuttondown">{{Timeselect.next.years}}</a>
</div>
<div class="pickercolumn pickercolumnday">
  <a dispatch="TIMESELECT_CHANGED" data-date-field="day" data-direction="plus" disabled={{Timeselect.limits.day.last}} class="pickerbutton pickerbuttonright"><i class="fa fa-lg fa-chevron-right"></i></a>
</div>
</div>
);
export default DateSelect;
