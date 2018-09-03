import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './store'
import './static/index.css'
import { AUTHENTICATE } from './constant/action-types'
import jwt_decode from 'jwt-decode'

const app = document.getElementById('root');
const token = localStorage.getItem('token')

if (token) {
  let user = jwt_decode(token).user
  store.dispatch({
    type: AUTHENTICATE,
    payload: user
  })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);
registerServiceWorker();
