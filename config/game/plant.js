const veggies = require('./veggies');
const grid = require('./grid')

function randomVeggiePlanting(player, veggies) {
    //This part randomizes the locations of the veggies 
    // for(let v = 0; v < Object.keys(veggies).length; v++){
    for(var veg in veggies){
        var fit = false; 
        while (!fit) {
            var row = Math.floor(Math.random()*10); 
            var col = Math.floor(Math.random()*10);
            var horizontal = (Math.random() < .5);

            fit = horizontal ?
                (veggies[veg].length + col < 10) && checkVeggiePlanting(horizontal, veggies[veg].length, row, col, player)
            :
                (veggies[veg].length + row < 10) && checkVeggiePlanting(horizontal, veggies[veg].length, row, col, player);

        }
        var len = veggies[veg].length;
        placeVeggieForPlayer(len, row, col, horizontal, player, veg);
    }
}

function checkVeggiePlanting(horizontal, len, row, col, player){
    let colOffset = horizontal ? 1 : 0;
    let rowOffset = horizontal ? 0 : 1;
        for(let i = 0; i < len; i++){
            //If a section of the board contains a ship, it's marked with a one
            //thus, if the function detects the section is marked with one, it returns false 
            // I WILL HAVE TO WRITE A VEGGIE NAME CHECK FN like an if else 
            // this code is causing me issues because it is not checking available spaces... just if the veggie prop is null
            if  (player.grids[0].gardenGrid[row + rowOffset * i][col + colOffset * i].veggie ) return false;
        }
    
    // else{
    //     for(let i = 0; i < len; i++){
    //         if(game.players[playerIdx].gardenGrid[row + i][col] == 1){
    //             return false; 
    //         }
    //     }
    // }
    return true; 
}

//places the veggies onto the board 
function placeVeggieForPlayer(len, row, col, horizontal, player, veg){
    for (let i = 0; i < len; i++) {
        if (horizontal) {
            player.grids[0].gardenGrid[row][col + i].veggie = veg; 
        } else {
            player.grids[0].gardenGrid[row + i][col].veggie = veg; 
        }
    }
}

module.exports= {
    randomVeggiePlanting,
    placeVeggieForPlayer,
    checkVeggiePlanting
}





// function randomVeggiePlanting(game, veggies) {
//     game.players.forEach(function(player) {
//         let grid = player.grids[0].gardenGrid;
//         for (let vegName in veggies) {
//             plantVeggieForPlayer(grid, vegName);
//         }  
//     });

// }

// function plantVeggieForPlayer(grid, vegName) {
//     let length = vegName.length;
//     col = Math.floor(Math.random() * 9);
//     row = Math.floor(Math.random() * 9);
//     while (length > 0) {
//         if (!grid[col][row].veggie) {
//             grid[col][row].veggie = vegName
//         } else {
        
//         }
//         length -= 1
//     }
// }

// random orientation in while loop 
// random placement
// if taken...
