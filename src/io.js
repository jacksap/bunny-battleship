const Game = require('../models/game');

let io;
var games ={}; 
module.exports = {

  init: function(httpServer) {
    io = require('socket.io')(httpServer);
    io.on('connection', function(socket) {
    
      socket.on('chat', function(chat) {
        io.emit('chat', chat);
      });

      socket.on('getActiveGame', function(userId) {
        var game = Object.values(games).find(g => g.players.some(p => p.id === userId));
        if (game) {
          socket.gameId = game._id;
          socket.join(game._id);
        }
        io.emit('gameData', game);
      });
      
      socket.on('createGame', function(user) {
        var game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
        game.save(function(err) {
          socket.gameId = game.id;
          socket.join(game.id);
          io.to(game.id).emit('gameData', game);
          games[game._id] = game;
        });
      });

      socket.on('joinGame', function(user, gameCode) {
        console.log(gameCode);
        var game = games[gameCode];
        game.players.push({
          name: user.name,
          id: user.id
        });
        console.log(game);
        socket.join(gameCode);
        io.emit('gameData', game);
        game.save();
      });
      
    });
  },

getIo: function() {return io}

};