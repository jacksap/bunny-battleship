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
        veggiePlanting={props.veggiePlanting}
      />
      <ChatBar 
        game={props.game}
        user={props.user}
      />
      </div>
  );
}

export default GameScreen;