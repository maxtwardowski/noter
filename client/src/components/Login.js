import React, { Component } from 'react';

class Login extends Component {

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
      })
    }).then(function(response){
      console.log(response.json())
    })

  }

  
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.sendData}>
          <p><input type="text" name="emailinput" placeholder="Email"/></p>
          <p><input type="text" name="passwordinput" placeholder="Password" /></p>
          <button>lets dooooeeeet</button>
        </form>
      </div>
    )
  }
}

export default Login;