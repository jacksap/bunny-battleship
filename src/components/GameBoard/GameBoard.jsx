import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ChatBar from '../../components/ChatBar/ChatBar'
import GardenGrid from '../../components/GardenGrid/GardenGrid'
import SnackGrid from '../../components/SnackGrid/SnackGrid'
import './GameBoard.css';


const GameBoard = (props) => (
    <div className="GameBoard">
         <NavBar user={props.user} handleLogout={props.handleLogout} />
         <GardenGrid handlePlantSelection={props.handlePlantSelection}/>
         <SnackGrid handleSnackSelection={props.handleSnackSelection}/>
         <ChatBar user={props.user}/>
    </div>
);

export default GameBoard;