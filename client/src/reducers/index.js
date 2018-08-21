import { AUTHENTICATE, REJECT, ERROR } from '../constant/action-types';

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
        user: action.payload.user,
        notes: action.payload.notes
      }
    case REJECT:
      return {
        ...state,
        authenticated: false,
        user: undefined,
        notes: []
      }
    case ERROR:
      return {
        ...state,
        authentication_error: true
      }
    default:
      return state;
  }
}

export default reducer;