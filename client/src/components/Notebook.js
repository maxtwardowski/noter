import React, { Component } from 'react';
import store from '../store';
import { authenticate } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => (
  {
    authenticate: () => dispatch(authenticate())
  }
);

class Notebook extends Component {

  constructor(props) {
    super(props);

    this.handleButtonState = this.handleButtonState.bind(this);
    this.handleButtonAuth = this.handleButtonAuth.bind(this);
  }

  handleButtonState = e => {
    e.preventDefault();
    console.log(store.getState())
  }

  handleButtonAuth = e => {
    this.props.authenticate();
  }

  render() {
    return (
      <div>
        <button onClick={e => this.handleButtonState(e)}>GetState</button>
        <button onClick={e => this.handleButtonAuth(e)}>Auth</button>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notebook);