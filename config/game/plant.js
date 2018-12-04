const veggies = require('./veggies');
const grid = require('./grid')

function randomVeggiePlanting(game, player, veggies) {
    //This part randomizes the locations of the veggies 
    for(let v = 0; v < game.player.veggies.length; v++){
        let fit = false; 
        while(!fit){
            let row = Math.floor(Math.random()*10); 
            let col = Math.floor(Math.random()*10);
            let horizontal = true; 
            
            //The following code saying whether it is placed horizontally or vertically
            //0 for horizontal
            //1 for vertical 
            if(Math.floor(Math.random()*2) == 1){
                horizontal = false;
            }

            // horizontal = (Math.random() < .5);
            
            //The following code makes sure the veggies do not extend beyond the edge of the board	
            if(horizontal){
                if(game.player.veggies[v].length + col > 9){
                    fit = false; 
                    // do I need to re run
                }
            }
            else{
                if(game.player.veggies[v].length + row > 9){
                    fit = false; 
                    // do I need to re run
                }
            }
            fit = checkVeggiePlanting(horizontal, game.player.veggies[v].length, row, col); 
        }
        let len = game.player.veggies[v].length;
        placeVeggieForPlayer(len, row, col, horizontal);
    }
}

function checkVeggiePlanting(horizontal, len, row, col){
    let colOffset = horizontal ? 1 : 0;
    let rowOffset = horizontal ? 0 : 1;
        for(let i = 0; i < len; i++){
            //If a section of the board contains a ship, it's marked with a one
            //thus, if the function detects the section is marked with one, it returns false 
            // I WILL HAVE TO WRITE A VEGGIE NAME CHECK FN like an if else 
            if(game.player.grids[0].gardenGrid[row + rowOffset][col + colOffset]){
                return false; 
            }
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
function placeVeggieForPlayer(len, r, c, horizontal){
    for(let i = 0; i < len; i++){
        if(horizontal){
            game.player.grids[0].gardenGrid[r][c + i] += 1; 
            // something about the veggie name here - I should maybe check
        }
        else{
            game.player.grids[0].gardenGrid[r + i][c] += 1; 
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
