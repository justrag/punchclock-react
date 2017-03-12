import React from 'react';

const ExitTime = ({
	Day.exit,
	Day.exit.time,
	EXITED_CHANGE,
	EXITED,
	Timeselect.timeString,
	Day.notYetEntered,
}) => (
	<div class="vertical">
	<p>
	Wyjście:
	{{#if Day.exit}}
	<span>{{Day.exit.time}}</span>
	{{else}}
	<span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
	{{/if}}
    </p>
	{{#if Day.exit}}
	<a dispatch='EXITED_CHANGE' class="button"><i class="fa fa-lg fa-pencil"></i><br />Jednak wyszedłem o:<br />{{Timeselect.timeString}}</a>
	{{else}}
	<a dispatch='EXITED' class="button" disabled={{Day.notYetEntered}}>
	<i class="fa fa-lg fa-sign-out"></i><br />Wychodzę o:<br />{{Timeselect.timeString}}
	</a>
	{{/if}}
	</div>
);
export default ExitTime;