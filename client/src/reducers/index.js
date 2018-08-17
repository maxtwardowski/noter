import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../constant/action-types';

const initialState = {
  authenticated: false,
  authentication_error: false,
  user: undefined,
  notes: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        user: action.payload
      }
    case UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        user: undefined,
        notes: []
      }
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        authentication_error: true
      }
    default:
      return state;
  }
}

export default reducer;