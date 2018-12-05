import React from 'react';
import GardenGrid from '../GardenGrid/GardenGrid';
import SnackGrid from '../SnackGrid/SnackGrid';

const GameGrids = (props) => {
    let message = props.game.currentTurn === 0 ? <p className='Message'>It's {props.game.players[0].name} turn!</p> : <p className='Message'>It's {props.game.players[1].name} turn!</p>;
   
    let grids = 
        <div>
            <div className="row">
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
        </div>;
    return (
        message,
        grids
        );
    }



export default GameGrids;