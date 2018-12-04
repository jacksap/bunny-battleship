import React from 'react';
import GardenGrid from '../GardenGrid/GardenGrid';
import SnackGrid from '../SnackGrid/SnackGrid';
import VeggiePlantingGrid from '../VeggiePlantingGrid/VeggiePlantingGrid';

const GameGrids = (props) => {
  let grids = 
    <div>
      <h3>Planting Veggies</h3>
    </div>;
  if (props.game.gameStatus) {
    if (props.game.gameStatus === 'begin') {
      grids = 
        <div>
            <VeggiePlantingGrid 
                veggies={props.game.veggies}
            />
            <GardenGrid 
                grid={props.myGameData.grids.gardenGrid}
                orientation={props.orientation}
                veggies={props.game.veggies}
                user={props.user}
            />
        </div>;
    } else {
        grids = 
        <div className="row">
            <SnackGrid 
                grid={props.myGameData.grids.snackGrid}
                snackAttempt={props.snackAttempt}
            />
            <GardenGrid 
                grid={props.myGameData.grids.gardenGrid}
            />
        </div>;
    }
  }

  return (
    grids
  );
}

export default GameGrids;