const GridCell= require('./cell'); 

function makeGameGrids() {
  let gardenGrid = new Array(10).fill(null);
  let snackGrid = gardenGrid.slice();
  
  function createCells(grid, CellData) {
    if (CellData) {
      grid.forEach((row, rowIdx) => {
        row = new Array(10).fill(null);
        row = row.map(() => new CellData());
        grid[rowIdx] = row;
      })
      return grid;
    } else {
      grid.forEach((row, rowIdx) => {
        row = new Array(10).fill(CellData);
        grid[rowIdx] = row;
      })
      return grid;
    }
  }
  
  gardenGrid = createCells(gardenGrid, GridCell); 
  snackGrid = createCells(snackGrid, null);
  
  return {gardenGrid, snackGrid};
}

function plantVeggies(player) {
  let gardenGrid = this[`player${player}`].grids.gardenGrid; // how am I going to access playerIdx (0/1)
  let row = 0;
  
  for (let key in this.veggieKinds) {
    this[`player${player}`].veggies[key] = { hits: 0 , harvested: false}
    for (let i = 0; i < this.veggieKinds[key].length; i++) {
      gardenGrid[row][i].veggie = key;
    }
    row += 2;
  }
}

function handleVeggiePlanting(veggieName, orientation, row, col, player) {
  if (veggieName) {
    let length = this.veggieKinds[veggieName].length;

    while (length > 0) {
      this[player].grids.gardenGrid[row][col].veggie = veggieName;
      orientation === 'horizontal' ? col += 1 : row += 1;
      length -= 1;
    }

    this[player].veggies[veggieName] = { hits: 0, harvested: false };
    this[player].plantedVeggies.push(veggieName);

    return (this.player1.plantedVeggies.length === 5 && this.player2.plantedVeggies.length === 5);
  }
}

module.exports= {
  makeGameGrids,
  plantVeggies,
  handleVeggiePlanting
}