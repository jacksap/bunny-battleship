module.exports = function(httpServer) {

    const io = require('socket.io')(httpServer);

io.on('connection', function(socket) {

    socket.on('game', function(game) {
    io.emit('game', game);
    });

});

  
};
