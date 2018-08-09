import React, { Component } from 'react';

class Login extends Component {

  sendData = event => {
    event.preventDefault();
    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: event.target.elements.logininput.value,
        password: event.target.elements.passwordinput.value,
      })
    })
  }

  
  render() {
    return (
      <div>
        <h1>loginn.</h1>
        <form onSubmit={this.sendData}>
          <p><input type="text" name="logininput" placeholder="Login"/></p>
          <p><input type="text" name="passwordinput" placeholder="Password" /></p>
          <button>lets dooooeeeet</button>
        </form>
      </div>
    )
  }
}

export default Login;