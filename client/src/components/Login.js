import React, { Component } from 'react';

class Login extends Component {

  state = {
    rememberme: false,
  }

  toggleRememberMe = () => {
    this.setState({
      rememberme: !this.state.rememberme,
    });
  }

  sendData = event => {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.elements.emailinput.value,
        password: event.target.elements.passwordinput.value,
        rememberme: this.state.rememberme,
      })
    })
  }

  
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.sendData}>
          <p><input type="text" name="emailinput" placeholder="Email"/></p>
          <p><input type="text" name="passwordinput" placeholder="Password" /></p>
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