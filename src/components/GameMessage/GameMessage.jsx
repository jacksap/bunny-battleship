import React from 'react';
import './GameMessage.css';

const GameScreen = (props) => {
    let gamePlayerMessage = props.game.players[props.game.currentTurn].name === props.user.name ? 
        <p > Take your turn {props.game.players[props.game.currentTurn].name}!</p> :
        <p>Waiting for {props.game.players[props.game.currentTurn].name} to take a snack!</p> ;
  return (
      <div className='GamePlayerMessage'>
          {gamePlayerMessage}
      </div>
  );
}

export default GameScreen;