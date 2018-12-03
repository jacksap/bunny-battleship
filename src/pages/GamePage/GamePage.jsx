import React, {Component} from 'react';
import './GamePage.css';
import gameService from '../../utils/gameService';
import NavBar from '../../components/NavBar/NavBar';
import GameScreen from '../../components/GameScreen/GameScreen'

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
        
        if (this.checkIfValidPlanting(veggieName, orientation, row, col, player)) {
        this.setState({selectedveggie: ''}, () => {
            this.socket.emit('plant veggie', {veggieName, orientation, row, col, player})
        });
        }
    }

    checkIfValidPlanting = (veggieName, orientation, row, col, player) => {
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

    handleGardenGridCellHover = (row, col) => {
        if (this.state.selectedVeggie) {
          let player = this.props.user.turnNo === 0 ? this.state.game.players[0] : this.state.game.players[1];
          let length = this.state.game.veggieKinds[this.state.selectedVeggie].length;
          let gardenGridCopy = [...this.state.game.player.grids.gardenGrid] // same comment as line 108
    
          if (this.checkIfValidPlanting(this.state.selectedVeggie, this.state.orientation, row, col, player)) {
            while (length > 0) {
              gardenGridCopy[row][col].hover = true;
              this.state.orientation === 'horizontal' ? col += 1 : row += 1;
              length -= 1;
            }
            this.setState(prevState => {
              let newState = {...prevState};
              newState.game.player.grids.gardenGrid = gardenGridCopy; // same comment as line 108
              return newState;
            });
          }
        }
      }
    
      handleGardenGridCellLeaveHover = (row, col) => {
        if (this.state.selectedVeggie) {
          let player = this.props.user.turnNo === 0 ? this.state.game.players[0] : this.state.game.players[1]; // how am I accessing these players?
          let length = this.state.game.veggieKinds[this.state.selectedVeggie].length;
          let gardenGridCopy = [...this.state.game.player.grids.gardenGrid] // should I be feeding the variable in differently?
    
          while (length > 0 && col < 10 && row < 10) {
            gardenGridCopy[row][col].hover = false;
            this.state.orientation === 'horizontal' ? col += 1 : row += 1;
            length -= 1;
          }
          this.setState(prevState => {
            let newState = {...prevState};
            newState.game.player.grids.gardenGrid = gardenGridCopy; // same comment as line 108
            return newState;
          });
        }
      }


    render() {
    return (
        <div>
            <NavBar user={this.props.user} handleLogout={this.props.handleLogout} />
            <GameScreen myGameData={this.state.user ? 
              (this.props.user._id === this.state.game.player0.id ? this.state.game.player0 : this.state.game.player1)
              :
              this.state.game.player1
            }
            game={this.state.game}
            socket={this.socket}
            user={this.props.user}
            snackAttempt={this.snackAttempt}
            handleVeggiePlanting={this.handleVeggiePlanting}
            handleVeggieSelection={this.handleVeggieSelection}
            handleOrientationChange={this.handleOrientationChange}
            selectedVeggie={this.state.selectedVeggie}
            orientation={this.state.orientation}
            checkIfValidPlanting={this.checkIfValidPlanting}
            handleGardenGridCellHover={this.handleGardenGridCellHover}
            handleGardenGridCellLeaveHover={this.handleGardenGridCellLeaveHover} />
        </div>
        )
    }
}

export default GamePage;