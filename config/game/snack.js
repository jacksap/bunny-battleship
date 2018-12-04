const veggies = require('./veggies');

function snackAttempt(game, row, col) {
    let snackingBunny,
        opponent;

    if (game.currentTurn === 0) {
      snackingBunny = game.players[0]; // how am i passing this via socket?
      opponent = game.players[1];
    } else {
      snackingBunny = game.players[1];
      opponent = game.players[0];
    }

    let opponentsGrid = opponent.grids[0].gardenGrid;
    let opponentsTargetedCell = opponentsGrid[row][col];
    let bunnysGrid = snackingBunny.grids[0].snackGrid;

    // Check if the targeted cell has already been snacked upon
    // Check if there is a veggie in the targeted cell
    // Check if the veggie has already been harvested
    if (!opponentsTargetedCell.targeted) {
      opponentsTargetedCell.targeted = true;
      if (opponentsTargetedCell.veggie) {
        if (!opponentsTargetedCell.harvested) {
          let veggieName = opponentsTargetedCell.veggie;
          // Change game state to represent the veggie hit
          opponentsTargetedCell.hit = true;
          opponent.veggies[veggieName].hits += 1; // the Player needs a veggie array.
          bunnysGrid[row][col] = 'hit';
          
          // Check if the current shot has harvested the veggie
          if (opponent.veggies[veggieName].hits === veggies[veggieName].length) {
            // If the veggie has been harvested update game state to account for that
            opponent.veggies[veggieName].harvested = true;
            opponentsGrid.forEach((searchRow, rowIdx) => {
              searchRow.forEach((searchCol, colIdx) => {
                if (opponentsGrid[rowIdx][colIdx].veggie === veggieName) {
                  opponentsGrid[rowIdx][colIdx].harvested = true;
                  bunnysGrid[rowIdx][colIdx] = 'harvested';
                }
              })
            })
          }
        }
      } else {
        bunnysGrid[row][col] = 'miss';
        opponentsTargetedCell.miss = true;
      }
      return true;
    }
    return false;
}

  function checkForGameWinner(game) {
    let snackingBunny, // why is this graying on me...
        opponent;

    if (game.currentTurn === 0) {
      snackingBunny = game.players[0];
      opponent = game.players[1];
    } else {
      snackingBunny = game.players[1];
      opponent = game.players[0];
    }

    for (let veggie in opponent.veggies) {
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