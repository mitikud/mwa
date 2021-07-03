const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const systemError = 500;
const userError = 400;
const systemWorking = 200;

const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    console.log("lat ", lat, " lng ", lng);

    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 6000000,
                $minDistance: 0
            }
        }
    };

    Game.find(query).exec(function (err, games) {
        if (err) {
            res.ststus(systemError).json({ "Error": err })
        }

        res.status(systemWorking).json(games);
    });
}

module.exports.gamesGetAll = function (req, res) {
    console.log("GET the games");
    console.log(req.query);

    let offset = 0;
    let count = 5;
    const maxCount = 8;

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset)
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(userError).json({ "message": "Querystring offset and count should be numbers" });
        return;
    }

    if(count > maxCount) {
        console.log("Error count exceeded");
        res.status(userError).json({"message": "Connot exceede the count"} );
    }

    console.log("offset ", offset, " count ", count);

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        const response = {
            status: systemWorking,
            message: games
        };
        if(err) {
            console.log("Error finding games", err);
            response.status = systemError;
            response.message = err;
        }    
        res.status(response.status).json(response.message);
    });
};


module.exports.gamesGetOne = function (req, res) {

    const gameID = req.params.gameID;
    if(gameID.length != 24) {
        res.status(userError).json({"message": "RequiestParam Game ID is not propper format"});
    }

    Game.findById(gameID).exec(function (err, game) {
        const response = {
            status: systemWorking,
            message: game
        };

        if(err) {
            console.log("Error finding game");
            response.status = systemError;
            response.message = err;
        } else if(!game) {
            response.status = userError;
            response.message = {"message": "Game ID not found"};
        }

        res.status(response.status).json(response.message);
    });
};


module.exports.gamesAddOne = function (req, res) {
    console.log("POST new game");
    console.log(req.body);
    const newGame = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        year: parseInt(req.body.year),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        rate: parseInt(req.body.rate),
        designers: req.body.designers,
        publisher: {}
    };

    Game.create(newGame, function(err, game) {
        const response = {
            status: 201,
            message: game
        };

        if(err) {
            console.log("Error Creating game");
            response.status = systemError;
            response.message = err;
        } 
        res.status(response.status).json(response.message);
    });
}