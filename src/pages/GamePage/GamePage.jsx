import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

const GamePage = (props) => (
    <div>
         <NavBar user={props.user} handleLogout={props.handleLogout} />
    </div>
);

export default GamePage;