import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ChatBar from '../../components/ChatBar/ChatBar'
import GardenGrid from '../../components/GardenGrid/GardenGrid'
import ShotGrid from '../../components/ShotGrid/ShotGrid'
import './GameBoard.css';


const GameBoard = (props) => (
    <div className="GameBoard">
         <NavBar user={props.user} handleLogout={props.handleLogout} />
         <GardenGrid handlePlantSelection={props.handlePlantSelection}/>
         <ShotGrid handleShotSelection={props.handleShotSelection}/>
         <ChatBar user={props.user}/>
    </div>
);

export default GameBoard;