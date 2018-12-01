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
      game: null
    };
  }

/*----- Create Game -----*/

  handleCreateGameClick = (e) => {
    e.preventDefault();
    gameService.createGame(this.state.user);
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

  senddGameData = () => {
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
      page = <HighScoresPage />
    } else if (game && game.players.length === 2) {
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
      page = <GamePage
        user={this.state.user}
        handleLogout={this.handleLogout} 
        handleCreateGameClick={this.handleCreateGameClick}
        handleJoinGameClick={this.handleJoinGameClick}
      />;
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
