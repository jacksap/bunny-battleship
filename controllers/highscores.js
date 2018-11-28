const bogusScores = [
    {player: 'Laura', guesses: 4, seconds: 379},
    {player: 'Katie', guesses: 4, seconds: 522},
    {player: 'Joe', guesses: 5, seconds: 966}
];
  
function index(req, res) {
    res.json(bogusScores);
}
  
module.exports = {
    index
};
