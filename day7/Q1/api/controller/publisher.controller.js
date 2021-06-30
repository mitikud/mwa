const mongoose = require('mongoose');
const Game= mongoose.model("Game");

module.exports.publisherGetOne = function (req, res) {
    console.log("Get One Publisher")
    const gameId = req.params.gameId;
    // Game.findById(gameId).exec(function(err, game){
    //     console.log("Found game", game);
    //     res.status(200).json(game.publisher);

    // })
    Game.findById(gameId).select("publisher").exec(function(err, publisher){
        console.log("Found publisher", publisher);
        res.status(200).json(publisher);

    })
}