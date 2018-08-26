import {
  AUTHENTICATE,
  REJECT,
  TOGGLE_AUTHENTICATION_ERROR,
  LOAD_NOTES
} from '../constant/action-types';

export const authenticate = user => ({
  type: AUTHENTICATE,
  payload: user
});

export const reject = () => ({
  type: REJECT
});

export const toggleAuthError = () => ({
  type: TOGGLE_AUTHENTICATION_ERROR
});

export const loadNotes = notes => ({
  type: LOAD_NOTES,
  payload: notes
});