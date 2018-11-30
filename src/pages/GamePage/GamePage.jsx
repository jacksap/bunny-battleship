import React from 'react';
import './GamePage.css';
import { Link } from 'react-router-dom';

const GamePage = props => {
    let GamePage = props.user ?
        <div>
            <div>
                <Link onClick={props.handleCreateGameClick} to='/'>CREATE GAME</Link>
            </div>
            <form onSubmit={props.handleJoinGameClick}>
            <button>JOIN GAME</button>
            <input type="text" placeholder="Game Code" name="gameCode"/>
            </form>
            <div>
                <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
            </div>
        </div>
        :
        <div>
            <div>
                <div>
                    <Link to='/login'>LOG IN</Link>
                </div>
                <div>
                    <Link to='/signup'>SIGN UP</Link>
                </div>
            </div>
        </div>;

   return (
    <div className="GamePage">
        {GamePage}
    </div>
);
}

export default GamePage;