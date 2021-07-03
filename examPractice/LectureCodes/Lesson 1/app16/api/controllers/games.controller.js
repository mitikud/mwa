const gamesData = require("../data/games.json")

module.exports.gamesGetAll = function (req, res) {
    console.log("GET all games");
    res.status(200).json(gamesData);
};

module.exports.gamesGetOne = function (req, res) {
    const gameID = req.params.gameID;
    const theGame = gamesData[gameID];

    console.log("GET game with gameID ", gameID);
    res.status(200).json(theGame);
};