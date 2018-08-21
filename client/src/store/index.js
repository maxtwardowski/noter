import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default store;