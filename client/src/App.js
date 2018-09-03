import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './components/Home'
import Navi from './components/Navi'
import Login from './components/Login'
import Signup from './components/Signup';
import Notebook from './components/Notebook';
import NoteAdder from './components/NoteAdder';
import Error from './components/Error';
import { reject, authenticate } from './actions';
import axios from 'axios';
import { API_ADDRESS } from './constant/server';

const mapStateToProps = state => ({
  authenticated: state.authenticated
})

const mapDispatchToProps = dispatch => ({
  authenticate: user => dispatch(authenticate(user)),
  reject: () => dispatch(reject())
})

class App extends Component {
  /*componentWillMount() {
    if (this.props.authenticated) {
      axios.get(`${API_ADDRESS}/user`, {
        'headers': {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.props.authenticate(res.data.user);
      })
    }
  }*/

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.reject();
  }

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
            <Route path="/logout" render={() => (
              <div>
                {this.handleLogout()}
                <Redirect to="/" />
              </div>
            )} />

            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
