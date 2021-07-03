const gamesData = require("../data/games")

module.exports.gamesGetAll = function (req, res) {
    console.log("GET the games");
    console.log(req.query);

    let offset = 0;
    let count = 5;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 5)
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 5);
    }

    const pageGames = gamesData.slice(offset, offset + count);

    res.status(200).json(pageGames);
};

module.exports.gamesGetOne = function (req, res) {
    const gameID = req.params.gameID;
    const theGame = gamesData[gameID];

    console.log("GET game with gameID ", gameID);
    res.status(200).json(theGame);
};

module.exports.gamesAddOne = function(req, res) {
    console.log("POST new game");
    console.log(req.body);
    req.status(200).json(req.body)
}