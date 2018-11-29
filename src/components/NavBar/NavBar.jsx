import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <h1 className='NavName'>Garden Grower</h1>
      <span className='NavLink'>Welcome, {props.user.name}</span>
      <br />
      <Link to='/high-scores' className='NavLink'>High Scores</Link>
      <span className='NavLink'>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
      <Link to='' onClick={props.handleLogout} className='NavLink'>Log Out</Link>
    </div>
    :
    <div>
      <h2 className='NavName'>Garden Grower</h2>
      <Link to='/login' className='NavLink'>Log In</Link>
      <span className='NavLink'>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
      <Link to='/signup' className='NavLink'>Sign Up</Link>
    </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default NavBar;