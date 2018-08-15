import React, { Component } from 'react';

import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '', 
      rememberme: false,
      error: false,
    }

    this.toggleRememberMe = this.toggleRememberMe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    axios.post('http://localhost:5000', {
      email: this.state.email,
      password: this.state.password,
      rememberme: this.state.rememberme,
    }).then(res => {
      localStorage.setItem('token', res.data);
      //this.props.history.push('/protected')
    }).catch(() => this.setState({
      error: true
    }));
  }

  /*sendData = e => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
        rememberme: this.state.rememberme,
      })
    })
  }*/

  
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <p><input type="text" name="email" placeholder="Email" onChange={e => this.handleChange(e)} /></p>
          <p><input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} /></p>
          <p>
            <input type="checkbox" id="rememberme" onChange={this.toggleRememberMe} />
            <label htmlFor="rememberme">Remember me</label>
          </p>
          <button>lets dooooeeeet</button>
        </form>
      </div>
    )
  }
}

export default Login;