const mongoose = require("mongoose")
const Game = mongoose.model("Game");

const getReview = function(req,res){
    const id = req.params.id;
    Game.findById(id).select("reviews").exec(function(err,reviews){
        const response = {
            status:200,
            data: reviews
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if (!reviews){
            response.status = 400;
            response.data = "Reviews not found";
        }
        res.status(response.status).json(response.data)
    })
}
function _addReview(req,res,game){
    const review = {name:req.body.name, review: req.body.review, rating: req.body.rating}
    if(!game.reviews){
        game.reviews = [];
    }
    game.reviews.push(review);
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
const addReview = function(req,res){
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
            _addReview(req,res,game)
        }  else {
            res.status(response.status).json(response.data)
        }
    })
}
const fullUpdateReview = function(req,res){
    const id = req.params.id;
    Game.findById(id).exec(function(err,game){
        const response = {
            status:200,
            data: data
        }
        if(err){
            response.status = 500;
            response.data = err;
        } else if(!game){
            response.status = 404;
            response.data = "Game not found"
        } 
        if (game){
            _addReview(req,res,game)
        }  else {
            res.status(response.status).json(response.data)
        }

    })

}
function _deleteReview(req,res,game){
    game.reviews = [];
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
const deleteReview = function(req,res){
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
        } else {
            _deleteReview(req,res,game)
        }

    })
}

module.exports = {getReview, addReview, fullUpdateReview, deleteReview}