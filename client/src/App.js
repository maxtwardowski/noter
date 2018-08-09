import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navi from './components/Navi';
import Login from './components/Login';
import Register from './components/Register'


class App extends Component {

  state = {
    authenticated : false,
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navi authenticated={this.state.authenticated} />
          <Switch>
            <Route path="/" exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
