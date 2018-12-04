import React, {Component} from 'react';
import './GamePage.css';
import gameService from '../../utils/gameService';
import NavBar from '../../components/NavBar/NavBar';
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

    // handleVeggieChoice = (veggie) => {
    // this.setState({selectedVeggie: veggie});
    // }

    // handleOrientationChange = () => {
    //     this.setState({orientation: (this.props.orientation === 'horizontal' ? 'vertical' : 'horizontal')});
    // }

    // handleVeggiePlanting = (veggieName, orientation, row, col) => {
    //     if (this.checkIfValidPlanting(veggieName, orientation, row, col)) {
    //         this.setState({selectedveggie: ''}, () => {
    //             this.socket.emit('veggiePlanting', {veggieName, orientation, row, col});
    //         });
    //     }
    // }

    // checkIfValidPlanting = (veggieName, orientation, row, col, player) => {
    //     if (veggieName) {
    //     let length = this.props.game.veggies[veggieName].length;

    //     while (length > 0) {
    //         if (col < 0 || row < 0 || col > 9 || row > 9) {
    //         return false;
    //         } else if (this.props.game.players.grids[0].gardenGrid[row][col].veggie) { // this is wrong must access correct player
    //         return false;
    //         }
    //         orientation === 'horizontal' ? col += 1 : row += 1;
    //         length -= 1;
    //     }
    //     return true;
    //     }
    //     return false;
    // }

    // handleGardenGridCellHover = (row, col) => {
    //     if (this.props.selectedVeggie) {
    //       let player = this.props.user.turnNo === 0 ? this.props.game.players[0] : this.props.game.players[1];
    //       let length = this.props.game.veggies[this.props.selectedVeggie].length;
    //       let gardenGridCopy = [...this.props.game.player.grids.gardenGrid] // same comment as line 108
    
    //       if (this.checkIfValidPlanting(this.props.selectedVeggie, this.props.orientation, row, col, player)) {
    //         while (length > 0) {
    //           gardenGridCopy[row][col].hover = true;
    //           this.props.orientation === 'horizontal' ? col += 1 : row += 1;
    //           length -= 1;
    //         }
    //         this.setState(prevState => {
    //           let newState = {...prevState};
    //           newState.game.player.grids.gardenGrid = gardenGridCopy; // same comment as line 108
    //           return newState;
    //         });
    //       }
    //     }
    //   }
    
    //   handleGardenGridCellLeaveHover = (row, col) => {
    //     if (this.props.selectedVeggie) {
    //       let player = this.props.user.turnNo === 0 ? this.props.game.players[0] : this.props.game.players[1]; // how am I accessing these players?
    //       let length = this.props.game.veggies[this.props.selectedVeggie].length;
    //       let gardenGridCopy = [...this.props.game.player.grids.gardenGrid] // should I be feeding the variable in differently?
    
    //       while (length > 0 && col < 10 && row < 10) {
    //         gardenGridCopy[row][col].hover = false;
    //         this.props.orientation === 'horizontal' ? col += 1 : row += 1;
    //         length -= 1;
    //       }
    //       this.setState(prevState => {
    //         let newState = {...prevState};
    //         newState.game.player.grids.gardenGrid = gardenGridCopy; // same comment as line 108
    //         return newState;
    //       });
    //     }
    //   }


    render() {
        if (!this.props.game) return null;
    return (
        <div>
            <NavBar user={this.props.user} handleLogout={this.props.handleLogout} />
            <GameScreen myGameData={this.props.user ? 
              (this.props.user._id === this.props.game.players ? this.props.game.players[0] : null)
              :
              this.props.game.player1
            }
            game={this.props.game}
            socket={this.socket}
            user={this.props.user}
            snackAttempt={this.snackAttempt}
            // handleVeggiePlanting={this.handleVeggiePlanting}
            // handleVeggieSelection={this.handleVeggieSelection}
            // handleOrientationChange={this.handleOrientationChange}
            // selectedVeggie={this.state.selectedVeggie}
            // orientation={this.state.orientation}
            // checkIfValidPlanting={this.checkIfValidPlanting}
            // handleGardenGridCellHover={this.handleGardenGridCellHover}
            // handleGardenGridCellLeaveHover={this.handleGardenGridCellLeaveHover} 
            />
        </div>
        )
    }
}

export default GamePage;