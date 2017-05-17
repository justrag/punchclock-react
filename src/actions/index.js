import { createAction } from "redux-act";
import { RemoteResource } from 'redux-remote-resource';
import { API_SERVER, INCIDENT, FETCH, SAVE, UPDATE , REQUEST, FAILURE, SUCCESS, INC } from '../constants/'; 
import { formatDate, formatTime } from "../libs/timeFunctions";

export const timeselectReset = createAction("TIMESELECT_RESET");
export const timeselectShiftlengthIncrease = createAction("TIMESELECT_SHIFTLENGTH_INCREASE");
export const timeselectShiftlengthDecrease = createAction("TIMESELECT_SHIFTLENGTH_DECREASE");
export const timeselectChangeDay = createAction("TIMESELECT_CHANGE_DAY");
export const timeselectChangeDate = createAction("TIMESELECT_CHANGE_DATE");
export const timeselectChangeMonth = createAction("TIMESELECT_CHANGE_MONTH");
export const timeselectChangeYear = createAction("TIMESELECT_CHANGE_YEAR");
export const timeselectChangeHour = createAction("TIMESELECT_CHANGE_HOUR");
export const timeselectChangeMinute = createAction("TIMESELECT_CHANGE_MINUTE");
export const timeselectSetTimestamp = createAction("TIMESELECT_SET_TIMESTAMP", (selected, newTimestamp) => ({selected, newTimestamp}));

export const clockTick = createAction("CLOCK_TICK", null, () => ({tick: true})); // to be intercepted by clockTick middleware

export const logOut = createAction("LOG_OUT");

export const logInRequest = createAction("LOG_IN_REQUEST");
export const logInSuccess = createAction("LOG_IN_SUCCESS", (login, token) => ({login, token}));
export const logInFailure = createAction("LOG_IN_FAILURE", error => ({error}));

export const logIn = (login, password) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/login`,
    method: 'post',
    headers: { 'Accept': 'application/json' },
    body: {login, password},
    lifecycle: {
      request: logInRequest.getType(),
      failure: (error, dispatch, data, response) => dispatch(logInFailure(error)),
      success: ({data}, dispatch) => dispatch(logInSuccess(data.login, data.token)),
    }
  }
});

const apiActionType = (model, mode, stage) => `${model}_${mode}_${stage}`;

const createRequestAction = (model, mode) => date => ({
      type: apiActionType(model, mode, REQUEST),
      api: {
        date,
        request: mode,
        model: model
      }
    });
const createSuccessAction = (model, mode) => data => ({
      type: apiActionType(model, mode, SUCCESS),
      api: {
        data,
        model: model
      }
    });
const createFailureAction = (model, mode) => error => ({
      type: apiActionType(model, mode, FAILURE),
      api: {
        error,
        model: model,
      }
    });

export const fetchIncident = (date) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${date}`,
    method: 'get',
    lifecycle: {
      request: dispatch =>
        dispatch(createRequestAction(INCIDENT,FETCH)(date)),
      success: (payload, dispatch, response) => 
        dispatch(createSuccessAction(INCIDENT,FETCH)(payload.data)),
      failure: (error, dispatch, payload, response) => 
        dispatch(createFailureAction(INCIDENT,FETCH)(error)),
    }
  }
});
export const saveIncident = (timestamp, shiftlength) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${formatDate(timestamp)}`,
    method: 'put',
    body: {enter: formatTime(timestamp), shiftlength},
    lifecycle: {
      request: dispatch =>
        dispatch(createRequestAction(INCIDENT,SAVE)(formatDate(timestamp))),
      success: (payload, dispatch, response) =>
        dispatch(createSuccessAction(INCIDENT,SAVE)(payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(createFailureAction(INCIDENT,SAVE)(error)),
    }
  }
});
export const updateIncident = (date, updateObject) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${date}`,
    method: 'patch',
    body: updateObject,
    lifecycle: {
      request: dispatch =>
        dispatch(createRequestAction(INCIDENT,UPDATE)(date)),
      success: (payload, dispatch, response) =>
        dispatch(createSuccessAction(INCIDENT,UPDATE)(payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(createFailureAction(INCIDENT,UPDATE)(error)),
    }
  }
});

/*
  if (action.payload &&
    [INCIDENT_FETCH_SUCCESS,INCIDENT_SAVE_SUCCESS,INCIDENT_UPDATE_SUCCESS].includes(action.type)) {
      return R.compose(
      R.assocPath([action.payload.date, 'enter'], new Date(`${action.payload.date} ${action.payload.enter}`).valueOf()),
      R.assocPath([action.payload.date, 'exit'], new Date(`${action.payload.date} ${action.payload.exit}`).valueOf()),  // CHECKME: null?
      R.assocPath([action.payload.date, 'shiftlength'], action.payload.shiftlength),
    )(state);
  };
*/

export const updateExit = timestamp =>
  updateIncident(formatDate(timestamp), {exit: formatTime(timestamp)});
export const updateShiftlength = (timestamp, shiftlength) =>
  updateIncident(formatDate(timestamp), {shiftlength: shiftlength});

export const createStatsAction = (period, direction) => () => ({
  type: `STATS_${period}_${direction}`,
  stats: {
    period,
    delta: (direction === INC) ? 1 : -1
  }
});