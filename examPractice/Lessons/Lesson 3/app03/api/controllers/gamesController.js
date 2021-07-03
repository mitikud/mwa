const dbConnection = require("../data/dbconnection");
const ObjectID = require("mongodb").ObjectID;


module.exports.gamesGetAll = function (req, res) {
    console.log("GET the games");
    console.log(req.query);

    let offset = 0;
    let count = 5;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 5)
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 5);
    }

    console.log("offset ", offset, " count ", count);

    const db = dbConnection.get();
    const collection = db.collection("games");

    collection.find().skip(offset).limit(count).toArray(function(err, docs) {
        console.log("Found Games ", docs);
        res.status(200).json(docs);
    });
};

module.exports.gamesGetOne = function (req, res) {
    const gameID = req.params.gameID;
    const db = dbConnection.get();
    const collection = db.collection("games");

    collection.findOne({_id: ObjectID(gameID)}, function(err, doc) {
        console.log("Found Game ", doc);
        res.status(200).json(doc);
    });
};

module.exports.gamesAddOne = function(req, res) {
    console.log("POST new game");
    console.log(req.body);
    const db = dbConnection.get();
    const collection = db.collection("games");
    let newGame = {};
    if(req.body && req.body.title && req.body.price) {
        console.log("The Required body: ", req.body);
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        
        collection.insertOne(newGame, function(err, result) {
            console.log("Games saved ", result);
            res.status(201).json(req.body);
        });
    } else {
        console.log("Data is missing");
        res.status(400).json({error: "Required data missing"});
    }
}