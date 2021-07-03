const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const _addPublisher = function(req, res, game) {
    console.log("Publisher: ", game.publisher) 
    game.publisher.name = req.body.name;
    game.publisher.address = req.body.address;
    //game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
        const response = {
            status: 201,
            message: updatedGame.publisher
        };

        if(err) {
            console.log("Error Error Saving publisher");
            response.status = systemError;
            response.message = err;
        } 
        // else {
        //     response.status= 201;
        //     response.message= updatedGame.publisher;
        //     }
        //     res.status(response.status).json(response.message);
         res.status(response.status).json(response.message);
    });

}

module.exports.publisherGetOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).select("publisher").exec(function(err, publishser) {
        console.log("Found Game ", publishser);
        res.status(200).json(publishser);
    });
};

module.exports.publisherAddOne = function (req, res) {
    const gameID = req.params.gameID;

    console.log("POST new publisher");
    //console.log(req.body);

    Game.findById(gameID).select("publisher").exec(function(err, game) { //.select("publisher")
        const response = {
            status: 201,
            message: game
        };

        if(err) {
            console.log("Error Creating game");
            response.status = systemError;
            response.message = err;
        }  else if(!game) {
            response.status = 404,
            response.message = {"message" : "Game ID not found"}
        } 
        
        if (game){
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
        
    });
}

module.exports.publisherFUllUpdateOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).exec(function(err, publishser) {
        console.log("Found Game ", publishser);
        if(err) {
            res.status(500).json(err);
        } else if(!game) {
            res.status(404).json({"message": "GameId not found"});
        }

        if(game) {
            game.publisher.name = req.body.name;
            game.save(function(err, updatedGame) {
                if(err) {
                    res.status(500).json(err);
                } else {
                    res.status(204).json(updatedGame.publishser);
                }
            });
            // res.status(204).json(publishser);
        }
        res.status(200).json(publishser);
    });
};
