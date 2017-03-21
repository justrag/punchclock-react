import { createReducer } from "redux-act";
//import endOfYesterday from 'date-fns/end_of_yesterday'
import { diffTimestamp, formatDiffTimestamp } from "../libs/timeFunctions";
//import { DATE, DAYS, MONTHS, YEARS, HOURS, MINUTES, PLUS, MINUS, dateFormats } from '../constants/';

const timeleft = createReducer(
  {
    [timeselectReset]: () => generateClockface(false, new Date()),
    [clockTick]: state => generateClockface(state.selected, (state.selected ? new Date(state.timestamp): new Date())),
    [timeselectChanged]: (state, payload) => changedClockface(state, payload),
  },
  generateClockface(false, new Date())
  );
export default timeleft;

/// THIS ONE DEPENDS ON day(enterTimestamp) and clockface and shift
/// PROBABLY SHOULD NOT BE ITS OWN REDUCER

    State.modify('Timeleft', (state = false) => {
      let timestamp=TF.diffTimestamp(State.get('Day.enter.timestamp'), State.get('Clockface.timestamp'), State.get('Shift.length'));
      let text=TF.formatDiffTimestamp(timestamp);
      let absText=text.substring(1);
      let gone= (timestamp>=0);
      return {text, absText, gone};
    });
