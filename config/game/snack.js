function snackAttempt(row, col) {
    let snackingBunny,
        gardener;

    if (currentTurn === 0) {
      snackingBunny = player[0];
      gardener = player[1];
    } else {
      snackingBunny = player[1];
      gardener = player[0];
    }

    let gardenersGrid = gardener.grids.gardenGrid;
    let gardenersTargetedCell = gardenersGrid[row][col];
    let bunnysGrid = snackingBunny.grids.snackGrid;

    if (!gardenersTargetedCell.targeted) {
    // Check if the targeted cell has already been snacked upon
      gardenersTargetedCell.targeted = true;
      // Check if there is a veggie in the targeted cell
      if (gardenersTargetedCell.veggie) {
        // Check if the veggie has already been harvested
        if (!gardenersTargetedCell.harvested) {
          let veggieName = gardenersTargetedCell.veggie;
          // Change game state to represent the veggie hit
          gardenersTargetedCell.hit = true;
          gardener.veggies[veggieName].hits += 1;
          bunnysGrid[row][col] = 'hit';
          
          // Check if the current shot has harvested the veggie
          if (gardener.veggies[veggieName].hits === veggieTypes[veggieName].length) {
            // If the veggie has been harvested update game state to account for that
            gardener.veggies[veggieName].harvested = true;
            gardenersGrid.forEach((searchRow, rowIdx) => {
              searchRow.forEach((searchCol, colIdx) => {
                if (gardenersGrid[rowIdx][colIdx].veggie === veggieName) {
                  gardenersGrid[rowIdx][colIdx].harvested = true;
                  bunnysGrid[rowIdx][colIdx] = 'harvested';
                }
              })
            })
          }
        }
      } else {
        bunnysGrid[row][col] = 'miss';
        gardenersTargetedCell.miss = true;
      }
      return true;
    }
    return false;
}

  function checkForGameWinner() {
    let snackingBunny, // why is this graying on me...
        gardener;

    if (currentTurn === 0) {
      snackingBunny = player[0];
      gardener = player[1];
    } else {
      snackingBunny = player[1];
      gardener = player[0];
    }

    let winner = true;
    for (let veggie in gardener.veggies) {
      if (!gardener.veggies[veggie].harvested) {
        winner = false;
      }
    }
    return winner;
}

module.exports={
    checkForGameWinner,
    snackAttempt
}