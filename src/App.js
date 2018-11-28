import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

class App extends Component {
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
