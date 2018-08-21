import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navi from './components/Navi'
import Login from './components/Login'
import Signup from './components/Signup'
import Notebook from './components/Notebook'
import NoteAdder from './components/NoteAdder'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navi />
          <h1>Noter</h1>
          <Switch>
            <Route path="/" exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/notebook" component={Notebook} />
            <Route path="/newnote" component={NoteAdder} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
