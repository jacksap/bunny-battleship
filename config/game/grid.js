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



module.exports= {
  makeGameGrids
}