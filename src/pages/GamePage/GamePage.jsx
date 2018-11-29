import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './GamePage.css';


const GamePage = (props) => (
    <div>
         <NavBar user={props.user} handleLogout={props.handleLogout} />
    </div>
);

export default GamePage;