import axios from 'axios';
import { API_ADDRESS } from '../constant/server';

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

export const getNotes = () => {
  return (dispatch, getState) => {
    axios.get(`${API_ADDRESS}/notes`, {
      'headers': {
        'user': getState().user
      }
    })
    .then(res => {
      dispatch(loadNotes(res.data))
    })
  }
}