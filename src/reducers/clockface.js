import { createReducer } from "redux-act";
import { displayNow } from "../libs/timeFunctions";
import { clockTick } from "../actions/";

const clockface = createReducer(
  {
    [clockTick]: () => displayNow()
  },
  displayNow()
);
export default clockface;
