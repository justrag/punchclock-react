import React from 'react';

const TimeSelect = ({
  TIMESELECT_CHANGED,
  Timeselect.limits.hours.first,
  Timeselect.limits.hours.last,
  Timeselect.limits.minutes.first,
  Timeselect.limits.minutes.last,
  Timeselect.parts.hours,
  Timeselect.parts.minutes,
  Timeselect.prev.hours,
  Timeselect.next.hours,
  Timeselect.prev.minutes,
  Timeselect.next.minutes,
}) => (
<div class="horizontal picker pickertime">
<div class="pickercolumn pickercolumnhours">
  <a dispatch="TIMESELECT_CHANGED"
  data-date-field="hours"
  data-direction="minus"
  disabled={{Timeselect.limits.hours.first}}
  class="pickerbutton pickerbuttonup">
  {{Timeselect.prev.hours}}
  </a>
<div class="pickercard">{{Timeselect.parts.hours}}:</div>
  <a dispatch="TIMESELECT_CHANGED"
  data-date-field="hours"
  data-direction="plus"
  disabled={{Timeselect.limits.hours.last}}
  class="pickerbutton pickerbuttondown">
  {{Timeselect.next.hours}}
  </a>
</div>
<div class="pickercolumn pickercolumnminutes">
  <a dispatch="TIMESELECT_CHANGED"
  data-date-field="minutes" 
  data-direction="minus" 
  disabled={{Timeselect.limits.minutes.first}}  
  class="pickerbutton pickerbuttonup">
  {{Timeselect.prev.minutes}}
  </a>
<div class="pickercard">{{Timeselect.parts.minutes}}</div>
  <a dispatch="TIMESELECT_CHANGED"
   data-date-field="minutes" 
   data-direction="plus" 
   disabled={{Timeselect.limits.minutes.last}} 
   class="pickerbutton pickerbuttondown">
   {{Timeselect.next.minutes}}
   </a>
</div>
</div>
);
export default TimeSelect;