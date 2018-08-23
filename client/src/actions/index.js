import {
  AUTHENTICATE,
  REJECT,
  SET_ERROR,
  LOAD_NOTES
} from '../constant/action-types';

export const authenticate = user => ({
  type: AUTHENTICATE,
  payload: user
});

export const reject = () => ({
  type: REJECT
});

export const setError = () => ({
  type: SET_ERROR
});

export const loadNotes = notes => ({
  type: LOAD_NOTES,
  payload: notes
});