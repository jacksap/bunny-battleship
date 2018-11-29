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
import socket from '../../utils/socket';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

/*---------- Helper Methods ----------*/


/*---------- Callback Methods ----------*/

handleLogout = () => {
  userService.logout();
  this.setState({user: null});
}

handleSignuporLogin = () => {
  this.setState({user: userService.getUser()});
}

/*---------- Lifecycle Methods ----------*/

componentDidMount() {
  let user = userService.getUser();
  this.setState({user});
  socket.on('game', (game) => {
    const newGames = [...this.state.games];
    newGames.push(game);
    this.setState({ games: newGames });
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
