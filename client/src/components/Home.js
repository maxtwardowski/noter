import React, { Component } from 'react';
import axios from 'axios';
import { API_ADDRESS } from '../constant/server';

class Home extends Component {

  constructor(props) {
    super(props);

    this.handleProtected = this.handleProtected.bind(this);
    this.handleUnprotected = this.handleUnprotected.bind(this);
  }

  handleUnprotected = e => {
    e.preventDefault();
    axios.get(`${API_ADDRESS}/unprotected`)
    .then(res => {
      console.log(res)
    })
  }

  handleProtected = e => {
    e.preventDefault();
    axios.get(`${API_ADDRESS}/protected`, {
      'headers': {
        'Authorization': localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <h2>Meet Noter!</h2>
        <button onClick={e => this.handleProtected(e)}>Protected</button>
        <button onClick={e => this.handleUnprotected(e)}>Unprotected</button>
      </div>
    )
  }
}

export default Home;