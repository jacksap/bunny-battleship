import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <div className='NavName'>GARDEN GROWER</div>
      <div className='NavBar'>
      <span className='NavLink'>Welcome, {props.user.name}</span>
      <br />
      {/* <Link to='/high-scores' className='NavLink'>High Scores</Link> */}
      <span className='NavLink'>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
      <Link to='' onClick={props.handleLogout} className='NavLink'>Log Out</Link>
    </div>
    </div>
    :
    <div>
      <h2 className='NavName'>GARDEN GROWER</h2>
    <div className='NavBar'>
      <Link to='/login' className='NavLink'>Log In</Link>
      <span className='NavLink'>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
      <Link to='/signup' className='NavLink'>Sign Up</Link>
    </div>
    </div>;

  return (
    <div>
      {nav}
    </div>
  );
};

export default NavBar;