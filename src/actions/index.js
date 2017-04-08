import { createAction } from "redux-act";
import { RemoteResource } from 'redux-remote-resource';
import { formatDate } from "../libs/timeFunctions";
import { API_SERVER } from '../constants/';

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
export const incidentSetEnter = createAction("INCIDENT_SET_ENTER", timestamp => ({timestamp, numericalDate: formatDate(timestamp)}));
export const incidentSetExit = createAction("INCIDENT_SET_EXIT",
  (timestamp, shiftLength) => ({timestamp, numericalDate: formatDate(timestamp), shiftLength}));

export const clockTick = createAction("CLOCK_TICK", null, () => ({tick: true})); // to be intercepted by clockTick middleware

export const logOut = createAction("LOG_OUT");

export const logInRequest = createAction("LOG_IN_REQUEST");
export const logInSuccess = createAction("LOG_IN_SUCCESS", (login, token) => ({login, token}));
export const logInFailure = createAction("LOG_IN_FAILURE");

// POST request
export const logIn = (login, password) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/login`,
    method: 'post',
    body: {login, password},
    lifecycle: {
      request: logInRequest.getType(),
      failure: logInFailure.getType(),
      success: (data, dispatch) => {
        dispatch(logInSuccess(data.login, data.token));
      },
    }
  }
});

/*
// Simple GET request
export function fetchPosts(topic) {
  return {
    [RemoteResource]: {
      uri: `/api/topics/${topic}/posts`,
      headers: { 'Accept': 'application/json' },
      lifecycle: {
        request: logInRequest.getType(),
        success: logInSuccess.getType(),
        failure: logInFailure.getType(),
      }
    }
  };
}

// POST request
export function createPost(topic, postData) {
  return {
    [RemoteResource]: {
      uri: `/api/topics/${topic}/posts`,
      method: 'post',
      body: postData,
      lifecycle: {
        request: {
          type: actionTypes.CREATE_POST_REQUEST, topic
        },
        success: (data, dispatch) => {
          dispatch(actions.postEditSuccess());
          dispatch(actions.createPost(data._id, data));
        },
        failure: (error, dispatch) => {
          dispatch(actions.postEditFailure(error));
        }
      }
    }
  };
}
*/