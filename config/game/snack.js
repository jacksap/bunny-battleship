const veggies = require('./veggies');

function snackAttempt(player, opponent, row, col) {
    var opponentsGrid = opponent.grids[0] && opponent.grids[0].gardenGrid;
    var opponentsTargetedCell = opponentsGrid[row][col];
    var bunnysGrid = player.grids[0] && player.grids[0].snackGrid;
    
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
          // console.log(opponent.veggies);
          // console.log(opponent.veggies[0]);
          opponent.veggies[0][veggieName].hits += 1; 
          bunnysGrid[row][col] = 'hit';
          // Check if the current shot has harvested the veggie
          if (opponent.veggies[0][veggieName].hits === opponent.veggies[0][veggieName].length) {
            // If the veggie has been harvested update game state to account for that
            opponentsTargetedCell.harvested = true;
            opponentsGrid.forEach((searchRow, rowIdx) => {
              searchRow.forEach((searchCol, colIdx) => {
                if (opponentsGrid[rowIdx][colIdx].veggie === veggieName) {
                  opponentsTargetedCell.harvested = true;
                  bunnysGrid[rowIdx][colIdx] = 'harvested';
                }
              })
            });
          }
        }
      } else {
        opponent.grids[0].gardenGrid[row][col].miss = true;
        player.grids[0].snackGrid[row][col] = 'miss';
      }
    }
}

  function checkForGameWinner(game) {
    var snackingBunny,
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