const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const _addPublisher = function (req, res, game) {
    console.log("Publisher: ", req.body);
    game.publisher.push(req.body);
    game.save(function (err, updatedGame) {
        console.log("sdfsdfsf ", game.publisher.name);
        const response = {
            status: 201,
            message: updatedGame.publisher
        };

        if (err) {
            console.log("Error Error Saving publisher");
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.publisherGetOne = function (req, res) {
    const gameID = req.params.gameID;
    const publisherId = req.params.publisherId;
    console.log("ID ", publisherId);

    Game.findById(gameID, function(err, game) {
        const doc = game.publisher.id(publisherId);
        console.log(doc);
        res.status(200).json(doc);
    })
};

module.exports.publisherGetAll = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).select("publisher").exec(function (err, publishser) {
        console.log("Found Game ", publishser);
        res.status(200).json(publishser);
    });
};

module.exports.publisherAddOne = function (req, res) {
    const gameID = req.params.gameID;

    console.log("POST new publisher");
    Game.findById(gameID).exec(function (err, game) {

        const response = {
            status: 201,
            message: game
        };

        if (err) {
            console.log("Error Creating game");
            response.status = systemError;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" }
        }

        if (game) {
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}
module.exports.publisherFUllUpdateOne = function (req, res) {
    const gameID = req.params.gameID;
    Game.findByIdAndUpdate(gameID, {
        publisher: {
            name: req.body.name,
            address: req.body.address
        }
    }).exec(function (err, game) {
        console.log("Found Game ", game);
        if (err) {
            res.status(500).json(err);
        } else if (!game) {
            res.status(404).json({ "message": "GameId not found" });
        }

        if (game) {
            game.publisher.name = req.body.name;
            game.save(function (err, updatedGame) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(204).json(updatedGame.publishser);
                }

            });
        }
    });
};


module.exports.publisherDeleteOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).exec(function (err, game) {
        console.log("Found Game ", game);
        if (err) {
            res.status(500).json(err);
        } else if (!game) {
            res.status(404).json({ "message": "GameId not found" });
        }

        if (game) {
            game.publisher.remove();
            game.save(function (err, updatedGame) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(204).json(updatedGame.publishser);
                }
            });
            // res.status(204).json(publishser);
        }
        //res.status(200).json(publishser);
    });
};