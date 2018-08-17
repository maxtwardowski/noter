import { AUTHENTICATE, REJECT, ERROR } from '../constant/action-types';

export const authenticate = (user, notes) => ({
  type: AUTHENTICATE,
  payload: {
    user: user,
    notes: notes
  }
});

export const reject = () => ({
  type: REJECT
});

export const error = () => ({
  type: ERROR
});