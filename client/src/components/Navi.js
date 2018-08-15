import React from 'react';
import { NavLink } from 'react-router-dom';

const Navi = props => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Sign up</NavLink>
    </div>
  )
}

export default Navi;