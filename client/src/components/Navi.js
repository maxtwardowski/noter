import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { reject } from '../actions';

const mapStateToProps = state => (
  {
    authenticated: state.authenticated
  }
)

const mapDispatchToProps = dispatch => (
  {
    reject: () => dispatch(reject())
  }
)

class Navi extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  isAuthenticated = () => (
    this.props.authenticated
  )

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.reject();
  }

  render() {
    if (this.isAuthenticated()) {
      return (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notebook">My Notebook</NavLink>
          <a href="" onClick={this.handleLogout}>Logout</a>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);