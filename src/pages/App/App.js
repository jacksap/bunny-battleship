import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

class App extends Component {
  

/*---------- Helper Methods ----------*/

/*---------- Callback Methods ----------*/


/*---------- Lifecycle Methods ----------*/

componentDidMount() {
  let user = userService.getUser();
    this.setState({user});
}

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route exact path='/signup' render={({ history }) => 
              <SignupPage
                history={history}
                
              />
          }/>
          <Route exact path='/login' render={() => 
              <LoginPage
                
              />
          }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
