import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { reject } from '../actions'

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  reject: () => dispatch(reject())
})

class Navi extends Component {
  isAuthenticated = () => (
    this.props.authenticated
  )

  getUser = () => (
    this.props.user
  )

  renderAuthNavbar = () => {
    if (this.isAuthenticated()) {
      return (
        <div>
          <p>Logged in as {this.getUser()}</p>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notebook">My Notebook</NavLink>
          <NavLink to="/newnote">New Note</NavLink>
          <NavLink to="/logout">Logout</NavLink>
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

  render() {
    return (
      <div>
        {this.renderAuthNavbar()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);