import React, { Component } from 'react';

class Register extends Component {

  sendData = event => {
    event.preventDefault();
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.elements.emailinput.value,
        password: event.target.elements.passwordinput.value,
        confirm_password: event.target.elements.passwordconfirminput.value,
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.sendData}>
          <p><input type="text" name="emailinput" placeholder="Email" /></p>
          <p><input type="text" name="passwordinput" placeholder="Password" /></p>
          <p><input type="text" name="passwordconfirminput" placeholder="Confirm Password" /></p>
          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default Register;