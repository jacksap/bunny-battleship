var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    id: String,
    name: String,
    grids: [mongoose.Schema.Types.Mixed],
    turnNo: 0,
    plantedVeggies: [mongoose.Schema.Types.Mixed] 
});

var gameSchema = new mongoose.Schema({
    players: [playerSchema],
    turnIndex: {type: Number, default: function() {
        return Math.floor(Math.random() * 2);
    }},
    gameOver: {type: Boolean, default: false},
    winner: {type: String, default: null },
});

module.exports = mongoose.model('Game', gameSchema)