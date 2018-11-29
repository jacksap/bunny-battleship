import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ChatBar from '../../components/ChatBar/ChatBar'
import GardenGrid from '../../components/GardenGrid/GardenGrid'
import ShotGrid from '../../components/ShotGrid/ShotGrid'
import './GamePage.css';


const GamePage = (props) => (
    <div className="GamePage">
         <NavBar user={props.user} handleLogout={props.handleLogout} />
         <GardenGrid />
         <ShotGrid />
         <img src='https://i.imgur.com/mh1Uefs.png' alt="navExtension" className="NavExtension"></img>
         <ChatBar user={props.user}/>
    </div>
);

export default GamePage;