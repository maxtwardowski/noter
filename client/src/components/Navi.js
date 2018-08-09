import React from 'react';
import { NavLink } from 'react-router-dom';

const Navi = props => {
  if (props.authenticated) {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <p>authenticated</p>
      </div>
    )
  } else {
    return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Sign up</NavLink>
      <p>not authenticated</p>
    </div>
    )
  }
}

export default Navi;