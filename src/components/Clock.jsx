import React from 'react';
import DateSelect from './DateSelect';
import ResetSelect from './ResetSelect';
import EnterTime from './EnterTime';
import ShiftLength from './ShiftLength';
import ExitTime from './ExitTime';
import TimeSelect from './TimeSelect';


const Clock = () => (<div>
<div class="horizontal">
<div></div>
<DateSelect />
<ResetSelect />
</div>
<div class="horizontal">
<EnterTime />
<ShiftLength />
<ExitTime />
</div>
<TimeSelect />
</div>);

export default Clock;
