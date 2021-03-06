import React, {Component} from 'react';
import highscoresAPI from '../../utils/highscoresAPI';
import {Link} from 'react-router-dom';
import './HighScoresPage.css';
import NavBar from '../../components/NavBar/NavBar';


class HighScoresPage extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }
  }
  componentDidMount() {
    highscoresAPI.index().then(scores =>
      this.setState({scores})
    );
  }
  render() {
    return (
      <div>
        <header>High Scores</header>
        <Link to='/'>RETURN</Link><br />
        <NavBar user={this.props.user} handleLogout={this.props.handleLogout} />
      </div>
    );
  }
}

export default HighScoresPage;