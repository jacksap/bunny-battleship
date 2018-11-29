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
    return (
      <div className="App">
          <Switch>
          <Route exact path='/' render={() =>
              <GamePage
                user={this.state.user}
                handleLogout={this.handleLogout}
                handleShotSelection={this.handleShotSelection}
                handlePlantSelection={this.handlePlantSelection}
                handleCreateGameClick={this.handleCreateGameClick}
              />
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
