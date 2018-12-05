import React from 'react';
import GardenGrid from '../GardenGrid/GardenGrid';
import SnackGrid from '../SnackGrid/SnackGrid';
import GameMessage from '../GameMessage/GameMessage';

import './GameGrids.css'

const GameGrids = (props) => {
    let message = props.game.currentTurn === 0 ? <p className='Message'>It's {props.game.players[0].name} turn!</p> : <p className='Message'>It's {props.game.players[1].name} turn!</p>;
   
    let grids = 
        <div>
            <div className="GridRow">
                <GardenGrid
                    game={props.game}
                    grid={props.myGameData.grids[0].gardenGrid}
                    veggiePlanting={props.veggiePlanting}
                />
                <SnackGrid 
                    grid={props.myGameData.grids[0].snackGrid}
                    snackAttempt={props.snackAttempt}
                />
            </div>
            <GameMessage game={props.game} user={props.user}/>
        </div>;
    return (
        message,
        grids
        );
    }



export default GameGrids;