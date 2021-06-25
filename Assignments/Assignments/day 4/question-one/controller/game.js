const db = require("../data/dbconnection")
const objectID = require("mongodb").objectId;
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getAllGames = function(req,res){
    Game.find().exec(function(err,games){
        console.log("Found games");
        res.status(200).json(games);

});
}
module.exports.getOneGame=  function(req,res){
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        console.log("Found game", game);
        res.status(200).json(game);
    });
}