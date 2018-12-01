var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    id: String,
    name: String,
    grids: [mongoose.Schema.Types.Mixed],
    veggies: {},
    turnNo: 0,
    plantedVeggies: [] 
});

var gameSchema = new mongoose.Schema({
    players: [playerSchema],
    turnIndex: {type: Number, default: function() {
        return Math.floor(Math.random() * 2);
    }},
    gameOver: {type: Boolean, default: false},
    winner: {type: String, default: null },
    veggies: {
        
    }
});
// Hardcode veggies 
// 'Cucumber': {
//     length: 5
//     },
//     'Carrot': {
//     length: 4
//     },
//     'Broccoli': {
//     length: 3
//     },
//     'Tomato': {
//     length: 3
//     },
//     'Onion': {
//     length: 2


module.exports = mongoose.model('Game', gameSchema)