import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './components/Home'
import Navi from './components/Navi'
import Login from './components/Login'
import Signup from './components/Signup';
import Notebook from './components/Notebook';
import NoteAdder from './components/NoteAdder';
import Logout from './components/Logout';
import Error from './components/Error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navi />
          <h1>Noter</h1>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/notebook" component={Notebook} />
            <Route path="/newnote" component={NoteAdder} />
            <Route path="/logout" component={Logout} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
