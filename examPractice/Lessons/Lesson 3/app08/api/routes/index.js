
const express = require("express");
const controllerGames = require("../controllers/games.Controller");
const controllerPublisher = require("../controllers/publisher.Controller");

const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameID")
    .get(controllerGames.gamesGetOne);

    //publisher
router.route("/games/:gameID/publishers")
    .get(controllerPublisher.publisherGetOne)
    .post(controllerPublisher.publisherAddOne);

// router.route("/games/:gameID/publishers")
    


module.exports = router;
