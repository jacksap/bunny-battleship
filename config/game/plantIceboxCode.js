// function plantVeggies(playerIdx) {
//     let gardenGrid = player[`${playerIdx}`].grids.gardenGrid; // how am I going to access playerIdx (0/1)
//     let row = 0;

//     for (let key in veggies) {
//         player[`${playerIdx}`].veggies[key] = { hits: 0 , harvested: false}
//         for (let i = 0; i < veggies[key].length; i++) {
//         gardenGrid[row][i].veggie = key;
//         }
//         row += 2;
//     }
// }

// function handleVeggiePlanting(player, game, veggieName, orientation, row, col, player) {
//     if (veggieName) {
//         let length = veggies[veggieName].length;

//         while (length > 0) {
//             player.grids[0].gardenGrid[row][col].veggie = veggieName;
//             orientation === 'horizontal' ? col += 1 : row += 1;
//             length -= 1;
//         }

//         player.selectedVeggies.push({
//             veggieName
//         });
//         // [veggieName] = { hits: 0, harvested: false };
//         player.plantedVeggies.push(veggieName);

//         return (game.players[0].plantedVeggies.length === 5 && game.players[1].plantedVeggies.length === 5);
//     }
// }

// all five veggies planted in array of board
// once for each player
// each type of veggie at a time and then each player

// module.exports= {
    // plantVeggies,
    // handleVeggiePlanting,
// }