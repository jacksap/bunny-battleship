import React, {Component} from 'react';
import highscoresAPI from '../../utils/highscoresAPI';
import {Link} from 'react-router-dom';
import './HighScoresPage.css';


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
      </div>
    );
  }
}

export default HighScoresPage;