
const express = require("express");
const controllerGames = require("../controllers/games.Controller");
const controllerPublisher = require("../controllers/publisher.Controller");
const controllerUsers = require("../controllers/users.Controller");

const router = express.Router();

//Game
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameID")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesPartialUpdateOne)
    .delete(controllerGames.gamesDeleteOne)

//publisher
router.route("/games/:gameID/publishers")
    .post(controllerPublisher.publisherAddOne)
    .get(controllerPublisher.publisherGetAll);

router.route("/games/:gameID/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne)
    .put(controllerPublisher.publisherFUllUpdateOne)
    .delete(controllerPublisher.publisherDeleteOne);


//users routes
router.route("/users")
    .post(controllerUsers.register);




module.exports = router;
