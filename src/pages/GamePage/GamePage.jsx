import React, {Component} from 'react';
import './GamePage.css';
import { Link } from 'react-router-dom';
import gameService from '../../utils/gameService';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            gameCode: e.target.value
        })
    }

    handleJoinClick = (e) => {
        gameService.joinGame(this.props.user, this.state.gameCode);
    }

    render() {
        let GamePage = this.props.user ?
            <div>
                <div>
                    <Link onClick={this.props.handleCreateGameClick} to='/'>CREATE GAME</Link>
                </div>
                <div>
                    <input type="text" placeholder="Game Code" name="gameCode" value={this.state.gameCode} onChange={this.handleChange}/>
                    <button onClick={this.handleJoinClick}> JOIN GAME </button>
                </div>
                <div>
                    <Link to='' onClick={this.props.handleLogout}> LOG OUT </Link>
                </div>
            </div>
            :
            <div>
                <div>
                    <div>
                        <Link to='/login'> LOG IN </Link>
                    </div>
                    <div>
                        <Link to='/signup'> SIGN UP </Link>
                    </div>
                </div>
            </div>;

    return (
        <div className="GamePage">
            {GamePage}
        </div>
        )
    }
}

export default GamePage;