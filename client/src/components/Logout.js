import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reject } from '../actions'
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";

const mapDispatchToProps = dispatch => ({
  reject: () => dispatch(reject())
})

class Logout extends Component {

  componentWillMount() {
    localStorage.removeItem('token');
    this.props.reject();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);