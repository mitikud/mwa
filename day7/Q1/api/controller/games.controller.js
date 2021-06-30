
const ObjectId = require("mongodb").ObjectId;
const mongoose = require('mongoose');

const Game = mongoose.model("Game");

const runGeoQuery = function (req, res) {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    console.log("@@@", lng, lat);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0         
            }
   
        }
    };

    Game.find(query).exec(function (err, games) {
        if (err) {
            console.log("Error", err)
            res.status(500).send("error")
        }
        else {
            res.status(200).send(games);
        }
    });
}

module.exports.gamesGetAll = function (req, res) {
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    console.log("All Games");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count)
    }
    // collection.find().skip(offset).limit(count).toArray(function (err, docs) {
    //     console.log("Found games", docs);
    //     res.status(200).json(docs);
    // })
    Game.find().skip(offset).limit(count).exec(function (err, games) {
        console.log("Found games", games);
        res.status(200).json(games);
    })

}

module.exports.getOne = function (req, res) {
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    const gameId = req.params.gameId;
    // collection.findOne({ _id: ObjectId(gameId) }, function (err,
    //     doc) {
    //     console.log("Found game", doc);
    //     res.status(200).json(doc);
    // });
    Game.findById(gameId).exec(function (err, game) {
        console.log("Found game", game);
        res.status(200).json(game);

    })
}

module.exports.gamesAddOne = function (req, res) {
    const db = dbConnection.get();
    const collection = db.collection("games");
    var newGame = {};
    if (req.body && req.body.title && req.body.price) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        collection.insertOne(newGame, function (err, response) {
            console.log(req.body);
            res.status(201).json(req.body);
        })
    }
    else {
        res.status(400).json({ "message": "wrong input provided" })
    }
}