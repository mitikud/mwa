const mongoose = require("mongoose")
const Game = mongoose.model("Game");

const getPublisher = function(req,res){
    const id = req.params.id;
    Game.findById(id).exec(function(err,game){
        const response = {
            status:200,
            data: game
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if (!game){
            response.status = 400;
            response.data = "Game not found";
        } else if (game){
            response.status = 200;
            response.data = game.publisher;
        }
        res.status(response.status).json(response)
    })
}
function _addPublisher(req,res,game){
    game.publisher= {name: req.body.name, address: req.body.address};
    game.save(function(err,game){
       const response = {
            status:200,
            data: game
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
        res.status(response.status).json(response.data)
    })
}
const addPublisher = function(req,res){
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
            response.status = 404;
            response.data = "Game not found";
        } 
        if (game){
            _addPublisher(req,res,game)
        }  else {
            res.status(response.status).json(response.data)
        }
    })
}
const fullUpdatePublisher = function(req,res){
    const id = req.params.id;
    Game.findById(id).exec(function(err,game){
        const response = {
            status:200,
            data: game
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if(!game){
            response.status = 404;
            response.data = "Game not found"
        } 
        if (game){
            _addPublisher(req,res,game)
        }  else {
            res.status(response.status).json(response.data)
        }

    })

}
function _deletePublisher(req,res,game){
    game.publisher.remove();
            game.save(function(err,newGame){
                const response = {
                    status:200,
                    data: newGame
                }
                if(err){
                    response.status = 500;
                    response.data = err;
                }
                res.status(response.status).json(response.data)
            })
}
const deletePublisher = function(req,res){
    const id = req.params.id;
    Game.findById(id).exec(function(err,game){
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
        } else if (!game.publisher){
            response.status = 404;
            response.data = "Publisher not found";
        }
        if(game.publisher){
            _deletePublisher(req,res,game)
        } else {
            res.status(response.status).json(response.data)
        }

    })
}

module.exports = {getPublisher, addPublisher, fullUpdatePublisher, deletePublisher}