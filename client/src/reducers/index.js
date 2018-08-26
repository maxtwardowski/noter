import {
  AUTHENTICATE,
  REJECT,
  TOGGLE_AUTHENTICATION_ERROR,
  LOAD_NOTES
} from '../constant/action-types';

const initialState = {
  authenticated: false,
  auth_error: false,
  signup_error: false,
  user: undefined,
  notes: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
        auth_error: false,
        user: action.payload
      }
    case REJECT:
      return {
        ...state,
        authenticated: false,
        user: undefined,
        notes: []
      }
    case TOGGLE_AUTHENTICATION_ERROR:
      return {
        ...state,
        auth_error: true
      }
    case LOAD_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    default:
      return state;
  }
}

export default reducer;