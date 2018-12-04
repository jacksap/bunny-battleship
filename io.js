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
      
      socket.on('joinGame', function(user, gameCode, turnNo) {
        var game = games[gameCode];
        game.players.push({
          playerIdx: 1,
          name: user.name,
          id: user.id,
          grids: grid.makeGameGrids(),
          turnNo: 1,
          veggies: veggies
        });
        // is this where I change game.gameStatus
        socket.gameId = game.id;
        socket.playerIdx = 1;
        socket.join(gameCode);
        // initialize veggies

        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('veggiePlanting', ({veggieName, row, col}) => { // veggie name needs to be accessed.
        let game = games[socket.gameId];
        
        // Check player
        var player = game.players[socket.playerIdx];
        var veggies = player.veggies[0];
        if (plant.randomVeggiePlanting(game, player, veggies)) {
          game.gameStatus = 'playMode';
        }
        io.to(game.id).emit('gameData', game);
        game.save();
      });



      socket.on('snackAttempt', ({row, col}) => {  // console.log the first round then it crashes
        console.log(row, col)      
        let game = games[socket.gameId];
        console.log(game) // nothing from this one.
        var player = game.players[socket.playerIdx];
        console.log(player)
        let snackingBunny,
        opponent;
        
        // if (game.currentTurn === 0) { // i have tried a variety of things here
        //   snackingBunny = game.players[0];
        //   opponent = game.players[1];
        // } else {
        //   snackingBunny = game.players[1];
        //   opponent = game.players[0];
        // }
    
        // Check if the game actually exists & is still going
        if (game && !game.gameOver) {
          // Check if it is the shooting player's turn
          if (game.currentTurn === player.turnNo) {
            // Submit the shooting players shot
            if (snack.snackAttempt(game, row, col)) {
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
      });

    });
  },

getIo: function() {return io}

};