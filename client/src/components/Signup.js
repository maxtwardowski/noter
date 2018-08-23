import React, { Component } from 'react';

import axios from 'axios';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordconfirm: '',
      error: false,
      passwordsmatch: undefined,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', {
      email: this.state.email,
      password: this.state.password,
    }).catch(() => this.setState({
      error: true
    }));
  }

  render() {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <p><input type="text" name="email" placeholder="Email" onChange={e => this.handleChange(e)} /></p>
          <p><input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} /></p>
          <p><input type="password" name="passwordconfirm" placeholder="Confirm Password" onChange={e => this.handleChange(e)} /></p>
          <button>Create account</button>
        </form>
      </div>
    )
  }
}

export default Signup;