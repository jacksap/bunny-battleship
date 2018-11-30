import socket from './socket';

export default {
    createGame,
    joinGame
};

function createGame(user) {
    socket.emit('createGame', user);
}

function joinGame(user, code) {
    socket.emit('joinGame', user, code);
}