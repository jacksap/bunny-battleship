import React from 'react';
import './WaitingPage.css';


const WaitingPage = (props) => (
    <div className="WaitingPage">
         <p>Waiting for opponent</p>
         <p>Send this code to a friend: {props.game._id}</p>
    </div>
);

export default WaitingPage;