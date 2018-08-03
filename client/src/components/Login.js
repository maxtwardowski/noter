import React, { Component } from 'react';

import axios from 'axios';

class Login extends Component {

  sendData = event => {

    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

  
  render() {
    return (
      <div>
        <h1>loginn.</h1>
        <button onClick={this.sendData}>lets doooeeet babe!</button>
      </div>
    )
  }
}

export default Login;