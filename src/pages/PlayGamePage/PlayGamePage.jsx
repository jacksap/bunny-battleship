import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './PlayGamePage.css';
import gameService from '../../utils/gameService';


class PlayGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                gameCode: ''
            }
        }
    }

    handleJoinClick = (e) => {
        gameService.joinGame(this.props.user, this.state.gameCode);
    }

    handleChange = (e) => {
        this.setState({
            gameCode: e.target.value
        })
    }

    render() {

        let PlayGamePage = this.props.user ?
            <div className="PlayGamePage">
                <div className='onOpen'>
                <div>
                    <Link onClick={this.props.handleCreateGameClick} to='/' className='onOpenLink'>CREATE GAME</Link>
                </div>
                <div>
                    <Link to='' onClick={this.props.handleLogout} className='onOpenLink'> LOG OUT </Link>
                </div>
                <div>
                    <input type="text" placeholder="ENTER GAME CODE" name="gameCode" className="inputPGP" value={this.state.gameCode} onChange={this.handleChange}/>
                    <button onClick={this.handleJoinClick} className='onOpenLink'> JOIN GAME </button>
                </div>
                </div>
            </div>
            :
            <div className="PlayGamePage"> 
                <div className='onOpen'>
                    <div>
                        <Link to='/login' className='onOpenLink'> LOG IN </Link>
                    </div>
                    <div>
                        <Link to='/signup' className='onOpenLink'> SIGN UP </Link>
                    </div>
                </div>
            </div>;

return (
    <div>
        {PlayGamePage}
    </div>
    )
}
}

export default PlayGamePage;