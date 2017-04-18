import { createAction } from "redux-act";
import { RemoteResource } from 'redux-remote-resource';
import { API_SERVER } from '../constants/';
import { getUserToken } from '../reducers/';
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

// POST request
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

export const incidentRequest = createAction("INCIDENT_REQUEST");
export const incidentSuccess = createAction("INCIDENT_SUCCESS", data => ({...data}));
export const incidentFailure = createAction("INCIDENT_FAILURE", error => ({error}));
export const getIncident = (date) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${date}`,
    method: 'get',
    /*
    headers: state => ({
      Accept: 'application/json',
      Authorization: `Bearer ${getUserToken(state)}`
    }),
    */
    headers: {
      Accept: 'application/json',
      Authorization: state => `Bearer ${getUserToken(state)}`,
    },
    lifecycle: {
      request: incidentRequest.getType(),
      failure: (error, dispatch, data, response) => dispatch(incidentFailure(error)),
      success: (payload, dispatch, response) => {
        dispatch(incidentSuccess(payload.data));
      },
    }
  }
});
export const postIncidentRequest = createAction("POST_INCIDENT_REQUEST");
export const postIncidentSuccess = createAction("POST_INCIDENT_SUCCESS", data => ({...data}));
export const postIncidentFailure = createAction("POST_INCIDENT_FAILURE", error => ({error}));
export const postIncident = (timestamp, shiftlength) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: state => `Bearer ${getUserToken(state)}`,
    },
    body: {date: formatDate(timestamp), enter: formatTime(timestamp), shiftlength },
    lifecycle: {
      request: postIncidentRequest.getType(),
      failure: (error, dispatch, data, response) => dispatch(postIncidentFailure(error)),
      success: (payload, dispatch, response) => dispatch(postIncidentSuccess(payload.data)),
    }
  }
});
