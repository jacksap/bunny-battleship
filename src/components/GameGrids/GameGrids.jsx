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
                veggies={props.game.veggieKindss}
                plantedVeggies={props.myGameData.plantedVeggies}
                handleVeggiePlanting={props.handleVeggiePlanting}
                handleVeggieSelection={props.handleVeggieSelection}
                handleOrientationChange={props.handleOrientationChange}
                orientation={props.orientation}
                selectedVeggie={props.selectedVeggie}
            />
            <GardenGrid 
                grid={props.myGameData.grids.gardenGrid}
                handleVeggiePlanting={props.handleVeggiePlanting}
                selectedveggie={props.selectedveggie}
                orientation={props.orientation}
                checkIfValidPlanting={props.checkIfValidPlanting}
                veggies={props.game.veggieKinds}
                user={props.user}
                handleGardenGridCellHover={props.handleGardenGridCellHover}
                handleGardenGridCellLeaveHover={props.handleGardenGridCellLeaveHover}
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