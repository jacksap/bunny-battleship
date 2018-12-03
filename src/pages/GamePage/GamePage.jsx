import React, {Component} from 'react';
import './GamePage.css';
import { Link } from 'react-router-dom';
import gameService from '../../utils/gameService';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        game: {
            player0: {
                id: null,
                grids: {
                gardenGrid: [],
                snackGrid: []
                }
            },
            player1: {
                id: null,
                grids: {
                gardenGrid: [],
                snackGrid: []
                }
            }
            },
            selectedVeggie: '',
            orientation: 'horizontal',
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
    handleVeggieChoice = (veggie) => {
    this.setState({chosenVeggie: veggie});
    }

    handleOrientationChange = () => {
        this.setState({orientation: (this.state.orientation === 'horizontal' ? 'vertical' : 'horizontal')});
    }

    handleVeggiePlanting = (veggieName, orientation, row, col) => {
        let player = this.props.user.turnNo === 0 ? 'player0' : 'player1';
        
        if (this.checkIfValidPlacement(veggieName, orientation, row, col, player)) {
        this.setState({selectedveggie: ''}, () => {
            this.socket.emit('place veggie', {veggieName, orientation, row, col, player})
        });
        }
    }

    checkIfValidPlacement = (veggieName, orientation, row, col, player) => {
        if (veggieName) {
        let length = this.state.game.veggies[veggieName].length;

        while (length > 0) {
            if (col < 0 || row < 0 || col > 9 || row > 9) {
            return false;
            } else if (this.state.game[player].grids.gardenGrid[row][col].veggie) {
            return false;
            }
            orientation === 'horizontal' ? col += 1 : row += 1;
            length -= 1;
        }
        return true;
        }
        return false;
    }

    

    render() {
        let GamePage = this.props.user ?
            <div>
                <div>
                    <Link onClick={this.props.handleCreateGameClick} to='/'>CREATE GAME</Link>
                </div>
                <div>
                    <input type="text" placeholder="Game Code" name="gameCode" value={this.state.gameCode} onChange={this.handleChange}/>
                    <button onClick={this.handleJoinClick}> JOIN GAME </button>
                </div>
                <div>
                    <Link to='' onClick={this.props.handleLogout}> LOG OUT </Link>
                </div>
            </div>
            :
            <div>
                <div>
                    <div>
                        <Link to='/login'> LOG IN </Link>
                    </div>
                    <div>
                        <Link to='/signup'> SIGN UP </Link>
                    </div>
                </div>
            </div>;

    return (
        <div className="GamePage">
            {GamePage}
        </div>
        )
    }
}

export default GamePage;