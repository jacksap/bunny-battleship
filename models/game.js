var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    id: String,
    name: String
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