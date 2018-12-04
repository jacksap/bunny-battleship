import React from 'react';
import './WaitingPage.css';


const WaitingPage = (props) => (
    <div className='WaitingPageCell'>
    <div className="WaitingPage">
         <div>Waiting for opponent</div>
         <div>Send this code to a friend: <span className='GameID'>{props.game._id}</span></div>
    </div>
    </div>
);

export default WaitingPage;