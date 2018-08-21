import { AUTHENTICATE, REJECT, SET_ERROR } from '../constant/action-types';

export const authenticate = (user, notes) => ({
  type: AUTHENTICATE,
  payload: {
    user,
    notes
  }
});

export const reject = () => ({
  type: REJECT
});

export const setError = () => ({
  type: SET_ERROR
});