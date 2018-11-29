import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <Link to='/high-scores'>High Scores</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='' onClick={props.handleLogout}>Log Out</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span>Welcome, {props.user.name}</span>
    </div>
    :
    <div>
      <Link to='/login'>Log In</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup'>Sign Up</Link>
    </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default NavBar;