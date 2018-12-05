const veggies = require('./veggies');

function snackAttempt(game, player, playerVeggies, grid, row, col) {
    var snackingBunny,
        opponent;

    if (game.currentTurn === 0) {
      snackingBunny = game.players[0]; // how am i passing this via socket?
      opponent = game.players[1];
    } else {
      snackingBunny = game.players[1];
      opponent = game.players[0];
    }
    var opponentsGrid = opponent.grids[0] && opponent.grids[0].gardenGrid;
    var opponentsTargetedCell = opponentsGrid[row][col];
    var bunnysGrid = snackingBunny.grids[0] && snackingBunny.grids[0].snackGrid;

    // Check if the targeted cell has already been snacked upon
    // Check if there is a veggie in the targeted cell
    // Check if the veggie has already been harvested
    if (!opponentsTargetedCell.targeted) {
      opponentsTargetedCell.targeted = true;
      if (opponentsTargetedCell.veggie) {
        if (!opponentsTargetedCell.harvested) {
          var veggieName = opponentsTargetedCell.veggie;
          // Change game state to represent the veggie hit
          opponentsTargetedCell.hit = true;
          console.log(opponent.veggies);
          console.log(opponent.veggies[0]);
          opponent.veggies[0][veggieName].hits += 1; // the Player needs a veggie array.
          bunnysGrid[row][col] = 'hit';
          
          // Check if the current shot has harvested the veggie
          if (opponent.veggies[0][veggieName].hits === opponent.veggies[0][veggieName].length) {
            // If the veggie has been harvested update game state to account for that
            oopponentsTargetedCell.harvested = true; // THIS IS NOT THE CELL!!!!!!!!!!!!!!!!!!!!!! needs to be on gg cell of opponent
            opponentsGrid.forEach((searchRow, rowIdx) => {
              searchRow.forEach((searchCol, colIdx) => {
                if (opponentsGrid[rowIdx][colIdx].veggie === veggieName) {
                  opponentsTargetedCell.harvested = true;
                  bunnysGrid[rowIdx][colIdx] = 'harvested';
                }
              })
            })
          }
        }
      } else {
        bunnysGrid[row][col] = 'miss';
        opponentsTargetedCell.miss = true;
        game.player[0] = snackingBunny
        game.player[1] = opponent
      return game;
      }
      return true;
    }
}

  function checkForGameWinner(game) {
    var snackingBunny, // why is this graying on me...
        opponent;

    if (game.currentTurn === 0) {
      snackingBunny = game.players[0];
      opponent = game.players[1];
    } else {
      snackingBunny = game.players[1];
      opponent = game.players[0];
    }

    for (var veggie in opponent.veggies) {
      if (!opponent.veggies[veggie].harvested) {
        return false;
      }
    }
    return true;
}

module.exports={
    checkForGameWinner,
    snackAttempt
}