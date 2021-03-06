const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const _addPublisher = (req, res, game)=>{
        
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
  
    game.save((err, updateGame)=>{
        const response = {
            status: 200,
            message: updateGame
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = updateGame;
        }
        res.status(response.status).json(response.message);

    })
    
}

module.exports.publisherGetOne = (req, res)=>{
    console.log("Get one publisher request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("publisher").exec((err, doc)=>{
        console.log("Fame found ", doc);
        res.status(200).json(doc);
    })
}


module.exports.publisherAddOne =  (req, res)=> {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec((err, game)=>{
        const response = {
            status: 200,
            message: game
        }
        if (err){
            response.status = 500,
            response.message = err;
        } else if (!game){
            response.status = 404,
            response.message = {"message": "Game ID not found"};
        } 
        if (game) {
           _addPublisher(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    })
   
}

module.exports.publisherFullUpdateOne = (req, res)=>{
    
    const response = {
        status: 200,
        message: game
    }
    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec((err, game)=>{
        if (err) {
           response.status = 404;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } else {
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message);
    })
}

