import React from 'react';
import { NavLink } from 'react-router-dom';

const Navi = props => {
  if (props.authenticated) {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <p>authenticateddddd</p>
      </div>
    )
  } else {
    return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <p>nopppp</p>
    </div>
    )
  }
}

export default Navi;