function plantVeggies(playerIdx) {
    let gardenGrid = player[`${playerIdx}`].grids.gardenGrid; // how am I going to access playerIdx (0/1)
    let row = 0;

    for (let key in veggieKinds) {
        player[`${playerIdx}`].veggies[key] = { hits: 0 , harvested: false}
        for (let i = 0; i < veggieKinds[key].length; i++) {
        gardenGrid[row][i].veggie = key;
        }
        row += 2;
    }
}

    function handleVeggiePlanting(veggieName, orientation, row, col, player) {
    if (veggieName) {
        let length = veggieKinds[veggieName].length;

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