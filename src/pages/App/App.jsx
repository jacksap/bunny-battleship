import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import gameService from '../../utils/gameService';

import socket from '../../utils/socket';

import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HighScoresPage from '../HighScoresPage/HighScoresPage';
import WaitingPage from '../WaitingPage/WaitingPage';
import PlayGamePage from '../PlayGamePage/PlayGamePage';
import NavBar from '../../components/NavBar/NavBar'



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

  // handlePlantSelection = () => {
  //   alert('Plant!');
  // }

  
  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }
  
  handleSignuporLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  /*----- Socket.io -----*/
  
  sendGameData = () => {
    socket.emit('gameData', this.state.game);
  }
  
  snackAttempt = (row, col) => {
    console.log(row, col)
    socket.emit('snackAttempt', {row, col} );
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
      page = <HighScoresPage 
      user={this.state.user}
      handleLogout={this.handleLogout}
        />
    } else if (game && game.players.length === 2) {
      page = <GamePage
        user={this.state.user}
        handleLogout={this.handleLogout}
        handleCreateGameClick={this.handleCreateGameClick}
        snackAttempt={this.snackAttempt}
        veggiePlanting={this.veggiePlanting}
        game={this.state.game}
      />
    } else if (game && game.players.length === 1) {
      page = <WaitingPage game={this.state.game}/>
    } else {
      page = <PlayGamePage
        user={this.state.user}
        handleLogout={this.handleLogout} 
        handleCreateGameClick={this.handleCreateGameClick}
        handleJoinGameClick={this.handleJoinGameClick}
      />;
    }

    return (
      <div className="App">
          <div className='AppNavBar'>
          <NavBar 
            game={this.state.game} 
            user={this.state.user} 
            handleLogout={this.handleLogout}
          />
          </div>
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
                <HighScoresPage 
                user={this.state.user}
                handleLogout={this.handleLogout} 
                />
                :
                <Redirect to='/login' />
            )}/>
          </Switch>
      </div>
    );
  }
}

export default App;
