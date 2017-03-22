import React from "react";
import DateSelect from "./DateSelect";
import ResetSelect from "./ResetSelect";
import TimeSelect from "./TimeSelect";
/*
import EnterTime from "./EnterTime";
import ShiftLength from "./ShiftLength";
import ExitTime from "./ExitTime";
*/
const EnterTime = () => (<div>EnterTime</div>);
const ShiftLength = () => (<div>ShiftLength</div>);
const ExitTime = () => (<div>ExitTime</div>);

const Clock = () => (
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

export default Clock;
