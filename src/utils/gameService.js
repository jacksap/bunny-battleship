// import tokenService from './tokenService';
import socket from './socket';

// const BASE_URL = '/api/games';

export default {
    createGame
};

function createGame(user) {
    socket.emit('createGame', user);
}