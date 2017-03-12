import React from 'react';

const EnterTime = ({
  Day.enter,
  Day.enter.time,
  ENTERED_CHANGE,
  ENTERED,
  Timeselect.timeString,
}) => (
  <div class="vertical">
  <p>
  Wejście:
  <span>
  {{#if Day.enter}}
  {{Day.enter.time}}
  {{else}}
  &nbsp;&nbsp;:&nbsp;&nbsp;
    {{/if}}
    </span>
    </p>
  {{#if Day.enter}}
  <a dispatch='ENTERED_CHANGE' class="button"><i class="fa fa-lg fa-pencil"></i><br />Jednak wszedłem o:<br />{{Timeselect.timeString}}</a>
  {{else}}
  <a dispatch='ENTERED' class="button"><i class="fa fa-lg fa-sign-in"></i><br />Wchodzę o:<br />{{Timeselect.timeString}}</a>
  {{/if}}
  </div>);
export default EnterTime;
