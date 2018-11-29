var mongoose = require('mongoose');
var User = require('../models/user');

var playerSchema = mongoose.Schema({
    id: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    turn: Boolean
});

var gameSchema = new mongoose.Schema({
    players: [playerSchema],
    player_garden: String,
    garden_turn: String,
    garden_state: String,
    garden_plant_state: String,
    garden_watered_state: String,
    garden_grown_state: String,
    garden_updated_at: Date
});


module.exports = mongoose.model('Game', gameSchema)