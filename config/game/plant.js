const veggies = require('./veggies');
const grid = require('./grid')

function randomVeggiePlanting(game, veggies) {
    game.players.forEach(function(player) {
        let grid = player.grids[0].gardenGrid;
        for (let vegName in veggies) {
            plantVeggieForPlayer(grid, vegName);
        }  
    });

}

function plantVeggieForPlayer(grid, vegName) {
    let length = vegName.length;
    col = Math.floor(Math.random() * 9);
    row = Math.floor(Math.random() * 9);
    while (length > 0) {
        if (!grid[col][row].veggie) {
            grid[col][row].veggie = vegName
        } else {
            
        }
        length -= 1
    }
}

// random orientation in while loop 
// random placement
// if taken...

module.exports= {
    randomVeggiePlanting,
    plantVeggieForPlayer
}