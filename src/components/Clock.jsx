import React from "react";
import DateSelect from "./DateSelect";
import ResetSelect from "./ResetSelect";
import TimeSelect from "./TimeSelect";
import EnterTime from "./EnterTime";
import ExitTime from "./ExitTime";
/*
import ShiftLength from "./ShiftLength";
*/
const ShiftLength = () => (<div>ShiftLength</div>);

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
