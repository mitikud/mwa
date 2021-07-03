const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).select("publisher").exec(function(err, publishser) {
        console.log("Found Game ", publishser);
        res.status(200).json(publishser);
    });
};