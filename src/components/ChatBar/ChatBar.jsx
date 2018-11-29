import React, { Component } from 'react';
import socket from '../../utils/socket';
import './ChatBar.css';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [{from: 'Fred', msg: 'Hello!'}],
      from: 'Suzy',
      msg: ''
      // game: null
    };
  }

  /* ---- Callback Methods --- */

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendChat = () => {
    socket.emit('chat', {from: this.state.from, msg: this.state.msg});
    this.setState({msg: ''});
  }
  
  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    socket.on('chat', (chat) => {
      const newChats = [...this.state.chats];
      newChats.push(chat);
      this.setState({ chats: newChats });
    });
  }

  render() {
    return (
        <div className="Chat">
            <div>
              <section className="ChatSection">
                <input type="text" name='from' value={this.state.from} onChange={this.handleChange} /><br/>
                <textarea type="text" name='msg' value={this.state.msg} onChange={this.handleChange} /><br/>
                <button onClick={this.sendChat}>Send Chat</button>
              </section>
              <section className="ChatSection">
                {this.state.chats.map((c, i) =>
                  <article key={i}>
                    <span>{c.from}: </span>
                    <span>{c.msg}</span>
                  </article>
                )}
              </section>
            </div>
        </div>
    );
  }
}

export default ChatBar;