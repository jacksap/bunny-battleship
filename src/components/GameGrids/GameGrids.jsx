import React from 'react';
import GardenGrid from '../GardenGrid/GardenGrid';
import SnackGrid from '../SnackGrid/SnackGrid';

const GameGrids = (props) => {
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
        grids
        );
    }



export default GameGrids;