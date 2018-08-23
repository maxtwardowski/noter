import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { authenticate, setError } from '../actions';

const mapStateToProps = state => (
  {
    authentication_error: state.authentication_error
  }
)

const mapDispatchToProps = dispatch => (
  {
    authenticate: (user, notes) => dispatch(authenticate(user, notes)),
    setError: () => dispatch(setError())
  }
)

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberme: false
    }

    this.toggleRememberMe = this.toggleRememberMe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasAuthErrorOccured = () => (
    this.props.authentication_error
  )

  toggleRememberMe = () => {
    this.setState({
      rememberme: !this.state.rememberme,
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
      email: this.state.email,
      password: this.state.password,
      rememberme: this.state.rememberme,
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      this.props.authenticate(res.data.user, res.data.notes);
      //this.props.history.push('/protected')
    }).catch(() => {
      this.props.setError()
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
              onChange={e => this.handleChange(e)}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => this.handleChange(e)}
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