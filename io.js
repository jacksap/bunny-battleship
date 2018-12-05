const Game = require('./models/game');
const grid = require('./config/game/grid');
const veggies = require('./config/game/veggies');
const plant = require('./config/game/plant')
const snack = require('./config/game/snack')

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
          grids: grid.makeGameGrids(),
          turnNo: 0,
          veggies: veggies
        });
        game.save(function(err) {
          socket.gameId = game.id;
          socket.playerIdx = 0;
          socket.join(game.id);
          // initialize all of the game doc's state
          io.to(game.id).emit('gameData', game);
          games[game._id] = game;
        });
      });
      
      socket.on('joinGame', function(user, gameCode) {
        var game = games[gameCode];
        game.players.push({
          playerIdx: 1,
          name: user.name,
          id: user.id,
          grids: grid.makeGameGrids(),
          turnNo: 1,
          veggies: veggies
        });
        // is this where I change game.gameStatus?
        // I could call veggie planting here.
        socket.gameId = game.id;
        socket.playerIdx = 1;
        socket.join(game.id);
        // initialize veggies

        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('veggiePlanting', () => { // veggie name needs to be accessed.
        var game = games[socket.gameId];
        var player = game.players[0];
        var veggies = player.veggies[0];
        plant.randomVeggiePlanting(game, player, veggies);
        player = game.players[1];
        veggies = player.veggies[0];
        plant.randomVeggiePlanting(game, player, veggies);
        game.gameStatus = 'playMode';
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('snackAttempt', ({row, col}) => {  // console.log the first round then it crashes
        var game = games[socket.gameId];
        console.log(game) // nothing from this one.
        var player = game.players[socket.playerIdx];
        var playerVeggies = player.veggies[0]
        var grid = player.grids[0]
        let snackingBunny,
        opponent;
        // Check if the game actually exists & is still going
        if (game && !game.gameOver) {
          // Check if it is the shooting player's turn
          if (game.currentTurn === player.turnNo) {
            // Submit the shooting players shot
            if (snack.snackAttempt(game, player, playerVeggies, grid, row, col)) {
              // Shot was valid, check for a winner
              if (snack.checkForGameWinner(game)) {
                game.gameOver = true;
                game.winner = snackingBunny.id;
              }
              // switch current turn and send game state to both players
              game.currentTurn ? game.currentTurn = 0 : game.currentTurn = 1;
              io.to(game.id).emit('gameData', game);
            }
          }
        }
        game.save();
        socket.gameId = game.id;
        socket.playerIdx = game.currentTurn;
      });

    });
  },

getIo: function() {return io}

};