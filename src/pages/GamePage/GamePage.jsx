import React, {Component} from 'react';
import './GamePage.css';
import gameService from '../../utils/gameService';
import GameScreen from '../../components/GameScreen/GameScreen'

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: ''
        }
    }
    
    /*--------Event Handlers------------*/

    handleChange = (e) => {
        this.setState({
            gameCode: e.target.value
        })
    }
    
    handleJoinClick = (e) => {
        gameService.joinGame(this.props.user, this.state.gameCode);
    }

    handleGameUpdate = (gameState) => {
        this.setState({game: gameState});
    }


    render() {
        if (!this.props.game) return null;
    return (
        <div>
            <GameScreen myGameData={this.props.user ? 
              (this.props.user._id === this.props.game.players[0].id ? this.props.game.players[0] : this.props.game.players[1])
              :
              this.props.game.players[1]
            }
            game={this.props.game}
            socket={this.socket}
            user={this.props.user}
            snackAttempt={this.props.snackAttempt}
            veggiePlanting={this.props.veggiePlanting}
            />
        </div>
        )
    }
}

export default GamePage;