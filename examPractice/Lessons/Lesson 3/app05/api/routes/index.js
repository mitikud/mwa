
const express = require("express");
const controllerGames = require("../controllers/games.Controller");
const controllerPublisher = require("../controllers/publisher.Controller");

const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameID")
    .get(controllerGames.gamesGetOne);

router.route("/games/:gameID/publisher")
    .get(controllerPublisher.publisherGetOne);


module.exports = router;
