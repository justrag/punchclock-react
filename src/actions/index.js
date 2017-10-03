import { createAction } from 'redux-act';
import { RemoteResource } from 'redux-remote-resource';
import {
  API_SERVER,
  INCIDENT,
  FETCH,
  SAVE,
  UPDATE,
  REQUEST,
  FAILURE,
  SUCCESS,
  INC,
  STATS_RESET
} from '../constants/';
import {
  formatDate,
  formatTime,
  getPeriodBegin,
  getPeriodEnd
} from '../libs/timeFunctions';

export const timeselectReset = createAction('TIMESELECT_RESET');
export const timeselectShiftlengthIncrease = createAction(
  'TIMESELECT_SHIFTLENGTH_INCREASE'
);
export const timeselectShiftlengthDecrease = createAction(
  'TIMESELECT_SHIFTLENGTH_DECREASE'
);
export const timeselectChangeDay = createAction('TIMESELECT_CHANGE_DAY');
export const timeselectChangeDate = createAction('TIMESELECT_CHANGE_DATE');
export const timeselectChangeMonth = createAction('TIMESELECT_CHANGE_MONTH');
export const timeselectChangeYear = createAction('TIMESELECT_CHANGE_YEAR');
export const timeselectChangeHour = createAction('TIMESELECT_CHANGE_HOUR');
export const timeselectChangeMinute = createAction('TIMESELECT_CHANGE_MINUTE');
export const timeselectSetTimestamp = createAction(
  'TIMESELECT_SET_TIMESTAMP',
  (selected, newTimestamp) => ({ selected, newTimestamp })
);

export const clockTick = createAction('CLOCK_TICK', null, () => ({
  tick: true
})); // to be intercepted by clockTick middleware

export const logOut = createAction('LOG_OUT');

export const logInRequest = createAction('LOG_IN_REQUEST');
export const logInSuccess = createAction('LOG_IN_SUCCESS', (login, token) => ({
  login,
  token
}));
export const logInFailure = createAction('LOG_IN_FAILURE', error => ({
  error
}));

export const logIn = (login, password) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/login`,
    method: 'post',
    headers: { Accept: 'application/json' },
    body: { login, password },
    lifecycle: {
      request: logInRequest.getType(),
      failure: (error, dispatch, data, response) =>
        dispatch(logInFailure(error)),
      success: ({ data }, dispatch) =>
        dispatch(logInSuccess(data.login, data.token))
    }
  }
});

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction(
  'REGISTER_SUCCESS',
  (login, token) => ({ login, token })
);
export const registerFailure = createAction('REGISTER_FAILURE', error => ({
  error
}));
export const register = (login, password, name, email) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/create`,
    method: 'post',
    headers: { Accept: 'application/json' },
    body: { login, password, name, email },
    lifecycle: {
      request: registerRequest.getType(),
      failure: (error, dispatch, data, response) =>
        dispatch(registerFailure(error)),
      success: ({ data }, dispatch) =>
        dispatch(registerSuccess(data.login, data.token))
    }
  }
});

// FIXME: success, failure output params are just copied fron register
// change them
export const forgotPasswordRequest = createAction('FORGOTPASSWORD_REQUEST');
export const forgotPasswordSuccess = createAction('FORGOTPASSWORD_SUCCESS');
export const forgotPasswordFailure = createAction(
  'FORGOTPASSWORD_FAILURE',
  error => ({ error })
);
export const forgotPassword = email => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/forgot-password`,
    method: 'post',
    headers: { Accept: 'application/json' },
    body: { email },
    lifecycle: {
      request: forgotPasswordRequest.getType(),
      failure: (error, dispatch, data, response) =>
        dispatch(forgotPasswordFailure(error)),
      success: forgotPasswordSuccess.getType()
    }
  }
});

export const resetPasswordRequest = createAction('RESETPASSWORD_REQUEST');
export const resetPasswordSuccess = createAction('RESETPASSWORD_SUCCESS');
export const resetPasswordFailure = createAction(
  'RESETPASSWORD_FAILURE',
  error => ({ error })
);
export const resetPassword = (resetToken, password) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/auth/reset-password/${resetToken}`,
    method: 'post',
    headers: { Accept: 'application/json' },
    body: { password },
    lifecycle: {
      request: resetPasswordRequest.getType(),
      failure: (error, dispatch, data, response) =>
        dispatch(resetPasswordFailure(error)),
      success: resetPasswordSuccess.getType()
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
    model: model
  }
});

export const fetchIncident = date => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${date}`,
    method: 'get',
    lifecycle: {
      request: dispatch => dispatch(createRequestAction(INCIDENT, FETCH)(date)),
      success: (payload, dispatch, response) =>
        dispatch(createSuccessAction(INCIDENT, FETCH)(payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(createFailureAction(INCIDENT, FETCH)(error))
    }
  }
});
export const saveIncident = (timestamp, shiftlength) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/${formatDate(timestamp)}`,
    method: 'put',
    body: { enter: formatTime(timestamp), shiftlength },
    lifecycle: {
      request: dispatch =>
        dispatch(createRequestAction(INCIDENT, SAVE)(formatDate(timestamp))),
      success: (payload, dispatch, response) =>
        dispatch(createSuccessAction(INCIDENT, SAVE)(payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(createFailureAction(INCIDENT, SAVE)(error))
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
        dispatch(createRequestAction(INCIDENT, UPDATE)(date)),
      success: (payload, dispatch, response) =>
        dispatch(createSuccessAction(INCIDENT, UPDATE)(payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(createFailureAction(INCIDENT, UPDATE)(error))
    }
  }
});

export const updateExit = timestamp =>
  updateIncident(formatDate(timestamp), { exit: formatTime(timestamp) });
export const updateShiftlength = (timestamp, shiftlength) =>
  updateIncident(formatDate(timestamp), { shiftlength: shiftlength });

export const statsReset = createAction(STATS_RESET);

export const statsRequest = period => ({
  type: 'STATS_REQUEST',
  stats: {
    period,
    request: true
  }
});
export const statsSuccess = (period, data) => ({
  type: 'STATS_SUCCESS',
  stats: {
    period,
    data
  }
});
export const statsFailure = (period, error) => ({
  type: 'STATS_FAILURE',
  stats: {
    period,
    error
  }
});

export const statsFetch = (period, slide) => ({
  [RemoteResource]: {
    uri: `${API_SERVER}/incidents/stats/${getPeriodBegin(
      period,
      slide
    )}/${getPeriodEnd(period, slide)}`,
    method: 'get',
    lifecycle: {
      request: dispatch => dispatch(statsRequest(period)),
      success: (payload, dispatch, response) =>
        dispatch(statsSuccess(period, payload.data)),
      failure: (error, dispatch, payload, response) =>
        dispatch(statsFailure(period, error))
    }
  }
});

export const createStatsAction = (period, direction) => () => ({
  type: `STATS_${period}_${direction}`,
  stats: {
    period,
    delta: direction === INC ? 1 : -1
  }
});
