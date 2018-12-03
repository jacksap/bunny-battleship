const veggies = require('./veggies');
const grid = require('./grid')

function plantVeggies(playerIdx) {
    let gardenGrid = player[`${playerIdx}`].grids.gardenGrid; // how am I going to access playerIdx (0/1)
    let row = 0;

    for (let key in veggies) {
        player[`${playerIdx}`].veggies[key] = { hits: 0 , harvested: false}
        for (let i = 0; i < veggies[key].length; i++) {
        gardenGrid[row][i].veggie = key;
        }
        row += 2;
    }
}

function handleVeggiePlanting(veggieName, orientation, row, col, player) {
    if (veggieName) {
        let length = veggies[veggieName].length;

        while (length > 0) {
        [player].grids.gardenGrid[row][col].veggie = veggieName;
        orientation === 'horizontal' ? col += 1 : row += 1;
        length -= 1;
        }

        [player].veggies[veggieName] = { hits: 0, harvested: false };
        [player].plantedVeggies.push(veggieName);

        return (player[0].plantedVeggies.length === 5 && player[1].plantedVeggies.length === 5);
    }
}

module.exports= {
    plantVeggies,
    handleVeggiePlanting
}