const mongoose = require("mongoose");
const Game = mongoose.model("Game");

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

    console.log("offset ", offset, " count ", count);

    Game.find().skip(offset).limit(count).exec(function(err, games) {
        console.log("Found Games ", games);
        res.status(200).json(games);
    })
};


module.exports.gamesGetOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).exec(function(err, game) {
        console.log("Found Game ", game);
        res.status(200).json(game);
    });
};


module.exports.gamesAddOne = function(req, res) {
    console.log("POST new game");
    console.log(req.body);
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    // let newGame = {};
    // if(req.body && req.body.title && req.body.price) {
    //     console.log("The Required body: ", req.body);
    //     newGame.title = req.body.title;
    //     newGame.price = parseFloat(req.body.price);     
    //     collection.insertOne(newGame, function(err, result) {
    //         console.log("Games saved ", result);
            res.status(201).json(req.body);
    //     });
    // } else {
    //     console.log("Data is missing");
    //     res.status(400).json({error: "Required data missing"});
    // }
}