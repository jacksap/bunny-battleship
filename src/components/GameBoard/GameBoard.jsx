import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ChatBar from '../../components/ChatBar/ChatBar'
import GardenGrid from '../../components/GardenGrid/GardenGrid'
import ShotGrid from '../../components/ShotGrid/ShotGrid'
import './GameBoard.css';


const GameBoard = (props) => (
    <div className="GameBoard">
         <button onClick={props.handleCreateGameClick}>START GAME</button>
         <NavBar user={props.user} handleLogout={props.handleLogout} />
         <GardenGrid handlePlantSelection={props.handlePlantSelection}/>
         <ShotGrid handleShotSelection={props.handleShotSelection}/>
         <img src='https://i.imgur.com/mh1Uefs.png' alt="navExtension" className="NavExtension"></img>
         <ChatBar user={props.user}/>
    </div>
);

export default GameBoard;