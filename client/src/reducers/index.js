import {
  AUTHENTICATE,
  REJECT,
  SET_ERROR,
  LOAD_NOTES
} from '../constant/action-types';

const initialState = {
  authenticated: false,
  authentication_error: false,
  user: undefined,
  notes: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
        authentication_error: false,
        user: action.payload
      }
    case REJECT:
      return {
        ...state,
        authenticated: false,
        user: undefined,
        notes: []
      }
    case SET_ERROR:
      return {
        ...state,
        authentication_error: true
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