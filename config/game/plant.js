const veggies = require('./veggies');
const grid = require('./grid')

function randomVeggiePlanting(grid, veggies) {
    //This part randomizes the locations of the veggies 
    for(var v = 0; v < game.players[playerIdx].veggies.length; v++){
        var fit = false; 
        while(!fit){
            var row = Math.floor(Math.random()*10); 
            var col = Math.floor(Math.random()*10);
            var horizontal = true; 
            
            //The following code saying whether it is placed horizontally or vertically
            //0 for horizontal
            //1 for vertical 
            if(Math.floor(Math.random()*2) == 1){
                horizontal = false;
            }
            
            //The following code makes sure the veggies do not extend beyond the edge of the board	
            if(horizontal){
                if(game.players[playersIdx].veggies[v].length + col > 9){
                    fit = false; 
                    // do I need to re run
                }
            }
            else{
                if(game.players[playersIdx].veggies[v].length + row > 9){
                    fit = false; 
                    // do I need to re run
                }
            }
            fit = checkVeggiePlanting(horizontal, game.players[playersIdx].veggies[v].length, row, col); 
        }
        var len = game.players[playersIdx].veggies[v].length;
        placeVeggieForPlayer(len, row, col, horizontal);
    }
}

function checkVeggiePlanting(horizontal, len, row, col){
    if(horizontal){
        for(var i = 0; i < len; i++){
            //If a section of the board contains a ship, it's marked with a one
            //thus, if the function detects the section is marked with one, it returns false 
            if(game.players[playerIdx].gardenGrid[row][col + i] == 1){
                return false; 
            }
        }
    }
    else{
        for(var i = 0; i < len; i++){
            if(game.players[playerIdx].gardenGrid[row + i][col] == 1){
                return false; 
            }
        }
    }
    return true; 
}

//places the veggies onto the board 
function plantVeggieForPlayer(slen, r, c, h_alignment){
    for(var i = 0; i < slen; i++){
        if(h_alignment){
            game.players[playerIdx].gardenGrid[r][c + i] += 1; 
        }
        else{
            game.players[playerIdx].gardenGrid[r + i][c] += 1; 
        }
    }
}

module.exports= {
    randomVeggiePlanting,
    plantVeggieForPlayer,
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
