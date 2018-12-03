const Game = require('./models/game');
const grid = require('./config/game/grid');
const veggies = require('./config/game/veggies');
const plant = require('./config/game/plant')

let io;
var games = {}; 

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
          playerIdx: 0,
          name: user.name,
          id: user._id,
          grids: grid.makeGameGrids()

        });
        game.save(function(err) {
          socket.gameId = game.id;
          socket.join(game.id);
          // initialize all of the game doc's state
          io.to(game.id).emit('gameData', game);
          games[game._id] = game;
        });
      });

      socket.on('joinGame', function(user, gameCode) {
        console.log(gameCode);
        var game = games[gameCode];
        game.players.push({
          playerIdx: 1,
          name: user.name,
          id: user.id,
          grids: grid.makeGameGrids()
        });
        console.log(game);
        socket.join(gameCode);
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('veggiePlanting', ({veggieName, orientation, row, col, playerIdx}) => { // veggie name needs to be accessed.
        let game = games[gameCode];
        
        // Check player
        if (users._id === game.players.id) {
          if (plant.handleVeggiePlanting(veggieName, orientation, row, col, playerIdx)) {
            game.gameStatus = 'playMode'
          }
          io.to(game.id).emit('gameData', game);
          game.save();
        }
      });
    });
  },

getIo: function() {return io}

};