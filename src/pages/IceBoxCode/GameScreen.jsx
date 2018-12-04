import React from 'react';
import GameGrids from './../GameGrids/GameGrids';
import ChatBar from './../ChatBar/ChatBar';

const GameScreen = (props) => {
  return (
      <div>
      <GameGrids 
        myGameData={props.myGameData}
        game={props.game}
        user={props.user}
        snackAttempt={props.snackAttempt}
        // handleVeggiePlanting={props.handleVeggiePlanting}
        // handleVeggieSelection={props.handleVeggieSelection}
        // handleOrientationChange={props.handleOrientationChange}
        // selectedVeggie={props.selectedVeggie}
        // orientation={props.orientation}
        // checkIfValidPlanting={props.checkIfValidPlanting}
        // handleGardenGridCellHover={props.handleGardenGridCellHover}
        // handleGardenGridCellLeaveHover={props.handleGardenGridCellLeaveHover}
      />
      <ChatBar />
      </div>
  );
}

export default GameScreen;