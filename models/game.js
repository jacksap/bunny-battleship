var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    id: String,
    name: String,
    grids: [mongoose.Schema.Types.Mixed],
    plantedVeggies: [mongoose.Schema.Types.Mixed], 
    veggies: [mongoose.Schema.Types.Mixed],
    turnNo: Number 
});

var gameSchema = new mongoose.Schema({
    players: [playerSchema],
    currentTurn: {type: Number, default: function() {
        return Math.floor(Math.random() * 2);
    }},
    gameOver: {type: Boolean, default: false},
    winner: {type: String, default: null },
    gameStatus: {type: String, default: null },
});

module.exports = mongoose.model('Game', gameSchema)