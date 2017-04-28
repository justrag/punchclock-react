/*
export const DATE = "date";
export const DAYS = "days";
export const MONTHS = "months";
export const YEARS = "years";
export const HOURS = "hours";
export const MINUTES = "minutes";
export const SECONDS = "seconds";
export const PLUS = "plus";
export const MINUS = "minus";
*/

export const API_SERVER = "http://localhost:8080";

export const FETCH = 'FETCH';
export const SAVE = 'SAVE';
export const UPDATE = 'UPDATE';

export const REQUEST = 'REQUEST';
export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

export const INCIDENT_FETCH_REQUEST = `INCIDENT_${FETCH}_${REQUEST}`;
export const INCIDENT_FETCH_FAILURE = `INCIDENT_${FETCH}_${FAILURE}`;
export const INCIDENT_FETCH_SUCCESS = `INCIDENT_${FETCH}_${SUCCESS}`;
export const INCIDENT_SAVE_REQUEST = `INCIDENT_${SAVE}_${REQUEST}`;
export const INCIDENT_SAVE_FAILURE = `INCIDENT_${SAVE}_${FAILURE}`;
export const INCIDENT_SAVE_SUCCESS = `INCIDENT_${SAVE}_${SUCCESS}`;
export const INCIDENT_UPDATE_REQUEST = `INCIDENT_${UPDATE}_${REQUEST}`;
export const INCIDENT_UPDATE_FAILURE = `INCIDENT_${UPDATE}_${FAILURE}`;
export const INCIDENT_UPDATE_SUCCESS = `INCIDENT_${UPDATE}_${SUCCESS}`;
