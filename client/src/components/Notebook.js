import React, { Component } from 'react';
import axios from 'axios';

class Notebook extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitButtonProtected = this.handleSubmitButtonProtected.bind(this);
    this.handleSubmitButtonUnprotected = this.handleSubmitButtonUnprotected.bind(this);
  }
  
  handleSubmitButtonProtected = e => {
    e.preventDefault();
    axios.get(`http://localhost:5000/protected?token=${localStorage.getItem('token')}`)
      .then(res => {
      console.log(res);
    });
  }
  

  handleSubmitButtonUnprotected = e => {
    e.preventDefault();
    axios.get('http://localhost:5000/unprotected')
    .then(res => console.log(res))
    .catch(() => console.log("errrrrorrrr"));
  }

  render() {
    return (
      <div>
        <button onClick={e => this.handleSubmitButtonProtected(e)}>Protected</button>
        <button onClick={e => this.handleSubmitButtonUnprotected(e)}>Unprotected</button>
      </div>
    )
  }
}

export default Notebook;