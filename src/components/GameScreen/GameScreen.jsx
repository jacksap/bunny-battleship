import React from 'react';
import GameGrids from './../GameGrids/GameGrids';

const GameScreen = (props) => {
  return (
      <GameGrids 
        myGameData={props.myGameData}
        game={props.game}
        user={props.user}
        snackAttempt={props.snackAttempt}
        handleVeggiePlanting={props.handleVeggiePlanting}
        handleVeggieSelection={props.handleVeggieSelection}
        handleOrientationChange={props.handleOrientationChange}
        selectedVeggie={props.selectedVeggie}
        orientation={props.orientation}
        checkIfValidPlanting={props.checkIfValidPlanting}
        handleGardenGridCellHover={props.handleGardenGridCellHover}
        handleGardenGridCellLeaveHover={props.handleGardenGridCellLeaveHover}
      />
  );
}

export default GameScreen;