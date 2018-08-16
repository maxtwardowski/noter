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
    axios.get(
      `http://localhost:5000/protected`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    console.log(localStorage.getItem('token'))
  }


  handleSubmitButtonUnprotected = e => {
    e.preventDefault();
    axios.get(`http://localhost:5000/unprotected`)
    .then(res => console.log(res))
    .catch(() => console.log("errrrrorrrr"));
  }

  render() {
    return (
      <div>
        <p><button onClick={e => this.handleSubmitButtonProtected(e)}>Protected</button></p>
        <p><button onClick={e => this.handleSubmitButtonUnprotected(e)}>Unprotected</button></p>
      </div>
    )
  }
}

export default Notebook;