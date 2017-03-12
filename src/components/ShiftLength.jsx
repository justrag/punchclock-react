import React from 'react';

const ShiftLength = ({
  SHIFTLENGTH_DECREASED,
  SHIFTLENGTH_INCREASED,
  Shift.length,
Day.exit,
Day.work.time,
Day.enter,
Timeselect.isItToday,
Timeleft.gone,
Timeleft.absText,
}) => (
  <div class="vertical topalign">
      <a dispatch='SHIFTLENGTH_DECREASED' class="button"><i class="fa fa-lg fa-minus"></i></a>
  <p>Dniówka: {{Shift.length}} godzin</p>
      <a dispatch='SHIFTLENGTH_INCREASED' class="button"><i class="fa fa-lg fa-plus"></i></a>
      {{#if Day.exit}}
       <p>Czas pracy: <span>{{Day.work.time}}</span></p>
       {{else}}
    {{#if Day.enter}}
    {{#if Timeselect.isItToday}}
    {{#if Timeleft.gone}}
  <p>Pora do domu: <span>{{Timeleft.absText}}</span> temu</p>
    {{else}}
  <p>Pora do domu za: <span>{{Timeleft.absText}}</span></p>
    {{/if}}
    {{/if}}
  {{/if}}
       {{/if}}
  </div>
);
export default ShiftLength;