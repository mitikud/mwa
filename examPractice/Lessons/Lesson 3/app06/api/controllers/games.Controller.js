const mongoose = require("mongoose");
const Game = mongoose.model("Game");

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
            res.ststus(500).json({ "Error": err })
        }

        res.status(200).json(games);
    });
}

module.exports.gamesGetAll = function (req, res) {
    console.log("GET the games");
    console.log(req.query);

    let offset = 0;
    let count = 5;

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 5)
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 5);
    }

    console.log("offset ", offset, " count ", count);

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        console.log("Found Games ", games);
        res.status(200).json(games);
    })
};


module.exports.gamesGetOne = function (req, res) {
    const gameID = req.params.gameID;

    Game.findById(gameID).exec(function (err, game) {
        console.log("Found Game ", game);
        res.status(200).json(game);
    });
};


module.exports.gamesAddOne = function (req, res) {
    console.log("POST new game");
    console.log(req.body);
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    // let newGame = {};
    // if(req.body && req.body.title && req.body.price) {
    //     console.log("The Required body: ", req.body);
    //     newGame.title = req.body.title;
    //     newGame.price = parseFloat(req.body.price);     
    //     collection.insertOne(newGame, function(err, result) {
    //         console.log("Games saved ", result);
    res.status(201).json(req.body);
    //     });
    // } else {
    //     console.log("Data is missing");
    //     res.status(400).json({error: "Required data missing"});
    // }
}