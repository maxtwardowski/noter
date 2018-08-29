import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { authenticate, toggleAuthError } from '../actions';
import { API_ADDRESS } from '../constant/server'
import Redirect from 'react-router-dom/Redirect';

const mapStateToProps = state => ({
    auth_error: state.auth_error
})

const mapDispatchToProps = dispatch => ({
    authenticate: (user, notes) => dispatch(authenticate(user, notes)),
    toggleAuthError: () => dispatch(toggleAuthError())
})

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberme: false,
      toNotebook: false
    }

    this.toggleRememberMe = this.toggleRememberMe.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasAuthErrorOccured = () => (
    this.props.auth_error
  )

  toggleRememberMe = () => {
    this.setState({
      rememberme: !this.state.rememberme,
    });
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post(`${API_ADDRESS}/login`, {
      email: this.state.email,
      password: this.state.password,
      rememberme: this.state.rememberme,
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      this.props.authenticate(res.data.user, res.data.notes);
      this.setState({
        toNotebook: true
      })
      //this.props.history.push('/protected')
    }).catch(() => {
      this.props.toggleAuthError()
    });
  }

  renderAuthErrorMessage = () => {
    if (this.hasAuthErrorOccured()) {
      return (
        <p style={{color:'red'}}>Email or password is incorrect!</p>
      )
    } else {
      return;
    }
  }

  render() {
    if (this.state.toNotebook) {
      return (
        <Redirect to="/notebook" />
      )
    }
    return (
      <div>
        <h2>Login</h2>
        {this.renderAuthErrorMessage()}
        <form onSubmit={e => this.handleSubmit(e)}>
          <p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={e => this.handleOnChange(e)}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => this.handleOnChange(e)}
            />
          </p>
          <p>
            <input
              type="checkbox"
              id="rememberme"
              onChange={this.toggleRememberMe}
            />
            <label htmlFor="rememberme">Remember me</label>
          </p>
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);