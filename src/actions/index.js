import { createAction } from "redux-act";
import { RemoteResource } from 'redux-remote-resource';
import { API_SERVER, FETCH, SAVE, UPDATE , REQUEST, FAILURE, SUCCESS } from '../constants/'; 
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

// should be async to API, just put it in store for now
export const incidentSetEnter = createAction("INCIDENT_SET_ENTER", timestamp => ({timestamp}));
export const incidentSetExit = createAction("INCIDENT_SET_EXIT",
  (timestamp, shiftLength) => ({timestamp, shiftLength}));

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
      date
    });
const createSuccessAction = (model, mode) => payload => ({
      type: apiActionType(model, mode, SUCCESS),
      payload
    });
const createFailureAction = (model, mode) => (payload, error) => ({
      type: apiActionType(model, mode, FAILURE),
      payload,
      error
    });

export const apiIncident = {
  [FETCH]: {
    [REQUEST]: createRequestAction('INCIDENT', FETCH),
    [SUCCESS]: createSuccessAction('INCIDENT', FETCH),
    [FAILURE]: createFailureAction('INCIDENT', FETCH)
  },
  [SAVE]: {
    [REQUEST]: createRequestAction('INCIDENT', SAVE),
    [SUCCESS]: createSuccessAction('INCIDENT', SAVE),
    [FAILURE]: createFailureAction('INCIDENT', SAVE)
  },
  [UPDATE]: {
    [REQUEST]: createRequestAction('INCIDENT', UPDATE),
    [SUCCESS]: createSuccessAction('INCIDENT', UPDATE),
    [FAILURE]: createFailureAction('INCIDENT', UPDATE)
  }
};

export const fetchIncident = (date) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${date}`,
    method: 'get',
    lifecycle: {
      request: dispatch =>
        dispatch(apiIncident[FETCH][REQUEST](date)),
      success: (payload, dispatch, response) =>
//        console.debug("SUCC payload: %o",payload),
        dispatch(apiIncident[FETCH][SUCCESS](payload.data)),
      failure: (error, dispatch, payload, response) =>
//        console.debug("FAIL error: %o; payload: %o",error,payload),
        dispatch(apiIncident[FETCH][FAILURE](payload, error)),
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
        dispatch(apiIncident[SAVE][REQUEST](formatDate(timestamp))),
      success: (payload, dispatch, response) =>
        dispatch(apiIncident[SAVE][SUCCESS](payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(apiIncident[SAVE][FAILURE](payload, error)),
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
        dispatch(apiIncident[SAVE][REQUEST](date)),
      success: (payload, dispatch, response) =>
        dispatch(apiIncident[SAVE][SUCCESS](payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(apiIncident[SAVE][FAILURE](payload, error)),
    }
  }
});

export const updateExit = timestamp =>
  updateIncident(formatDate(timestamp), {exit: formatTime(timestamp)});
export const updateShiftlength = (timestamp, shiftlength) =>
  updateIncident(formatDate(timestamp), {shiftlength: shiftlength});
