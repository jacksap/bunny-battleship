import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HighScoresPage from '../HighScoresPage/HighScoresPage';
import WaitingPage from '../WaitingPage/WaitingPage';
import GameBoard from '../../components/GameBoard/GameBoard';
import userService from '../../utils/userService';
import gameService from '../../utils/gameService';
import socket from '../../utils/socket';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameReady: false,
      gameStart: false,
      game: null
    };
  }

/*----- Create/Join Game -----*/

  handleCreateGameClick = (e) => {
    e.preventDefault();
    gameService.createGame(this.state.user);
  }

  handleJoinGameClick = (e) => {
    e.preventDefault();
    gameService.joinGame(this.state.user);
   }

/*---------- Helper Methods ----------*/


/*---------- Callback Methods ----------*/
  handlePlantSelection = () => {
    alert('Plant!');
  }

  handleShotSelection = () => {
    alert('Shot!');
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignuporLogin = () => {
    this.setState({user: userService.getUser()});
  }

/*----- Socket.io -----*/

  snedGameData = () => {
    socket.emit('gameData', this.state.game);
  }

/*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});

    if (user) socket.emit('getActiveGame', user._id);
      socket.on('gameData', (game) => {
        this.setState({ game });
      });
  }

  render() {
    let game = this.state.game;
    let page;

     if (game && game.players.length === 2 && game.garden_state) {
      // renders when there are 2 players and run has run out for both of them
      page = <HighScoresPage />
    } else if (game && game.players.length === 2) {
      // renders when there are 2 players and now the game is in play
      page = <GameBoard
        user={this.state.user}
        handleLogout={this.handleLogout}
        handleShotSelection={this.handleShotSelection}
        handlePlantSelection={this.handlePlantSelection}
        handleCreateGameClick={this.handleCreateGameClick}
      />
    } else if (game && game.players.length === 1) {
      page = <WaitingPage game={this.state.game} />
    } else {
      // no game
      page = <GamePage
        user={this.state.user}
        handleLogout={this.handleLogout} 
        handleCreateGameClick={this.handleCreateGameClick}
        handleJoinGameClick={this.handleJoinGameClick}
      />;
      // add code to input join game in frontpage
      // code is game id and 2nd player user id
    }
    return (
      <div className="App">
          <Switch>
          <Route exact path='/' render={() =>
          page
            }/>
          <Route exact path='/signup' render={(props) => 
              <SignupPage
                {...props}
                handleSignuporLogin={this.handleSignuporLogin}
              />
          }/>
          <Route exact path='/login' render={(props) => 
              <LoginPage
                {...props}
                handleSignuporLogin={this.handleSignuporLogin}
              />
          }/>
          <Route exact path='/highscores' render={() => (
              userService.getUser() ?
                <HighScoresPage />
                :
                <Redirect to='/login' />
            )}/>
          </Switch>
      </div>
    );
  }
}

export default App;
