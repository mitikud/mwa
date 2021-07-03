const mongoose = require("mongoose")
const Game = mongoose.model("Game");

const getAllGames = function(req,res){
    Game.find().limit(5).sort({year:-1}).exec(function(err,games){
        const response = {
            status:200,
            data: games
        }
        if(err){
            response.status = 400;
            response.data = err;
        }
        else if(!games){
            response.status = 400;
            response.data = "Game not found";
        }
        res.status(response.status).json(response.data)
    })
}

const getOneGame = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        Game.findById(id).exec(function(err,game){
            const response = {
                status:200,
                data: game
            }
            if(err){
                response.status = 400;
                response.data = err;
            } else if(!game){
                response.status = 400;
                response.data = "Game not found";
            }
            res.status(response.status).json(response.data)
        })
    }
    
}

const createGame = function(req,res){
    console.log(req.body)
    const game = {
        title: req.body.title,
         year: parseInt(req.body.year),
        price: parseFloat(req.body.price), 
        designers: req.body.designers,
        // publisher: [name: "empty", location: []],
         minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
         rate: parseFloat(req.body.rate)
    }
    console.log(game)
    Game.create(game,function(err,newGame){
        const response = {
            status:200,
            data: newGame
        }
        if(err){
            response.status = 400;
            response.data = err;
        }
        res.status(response.status).json(response.data)
    })
}

function _fullUpdateGame(req,res,game){
    
    game.title = req.body.title;
    game.year = parseInt(req.body.year);
    game.price = parseFloat( req.body.price);
    game.designers = req.body.designers;
    game.minPlayers = parseInt(req.body.minPlayers);
    game.maxPlayers =parseInt(req.body.maxPlayers)

    game.save(function(err,updatedGame){
        const response = {
            status:200,
            data: updatedGame
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
        res.status(response.status).json(response.data)
    })
}
const fullUpdateGame = function(req,res){
    const id = req.params.id;
    Game.findById(id).exec(function(err,game){
        const response = {
            status:200,
            data: game
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if(!game) {
            response.status = 400;
            response.data = "Game not found";
        }

        if(game){
            _fullUpdateGame(req,res,game)
        } else {
            res.status(response.status).json(response.data)
        }
    })
}

const partialUpdate = function(req,res){

}

const deleteGame = function(req,res){
    const id = req.params.id;
    Game.findByIdAndRemove(id).exec(function(err,game){
        const response = {
            status:200,
            data: game
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if (!game){
            response.status = 404;
            response.data = "Game not found";
        }
        res.status(response.status).json(response.data)
    })
}

module.exports = {getAllGames,getOneGame,createGame, fullUpdateGame, partialUpdate, deleteGame}