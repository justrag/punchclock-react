import React from 'react';

const ResetSelect = ({
  TIMESELECT_RESET,
  Timeselect.notselected,
  Clockface.display,
}) => (
<a dispatch="TIMESELECT_RESET" class="button" disabled={{Timeselect.notselected}}><i class="fa fa-refresh"></i><br />{{Clockface.display}}</a>
);
export default ResetSelect;