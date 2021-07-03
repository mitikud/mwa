
const express = require("express");
const controllerGames = require("../controllers/games.Controller");
const controllerPublisher = require("../controllers/publisher.Controller");

const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameID")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesPartialUpdateOne);

//publisher
router.route("/games/:gameID/publishers")
    .post(controllerPublisher.publisherAddOne);

router.route("/games/:gameID/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne)
    .put(controllerPublisher.publisherFUllUpdateOne);



module.exports = router;
