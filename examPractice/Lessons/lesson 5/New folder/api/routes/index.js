
const express = require("express");
const controllerGames = require("../controllers/games.Controller");
const controllerPublisher = require("../controllers/publisher.Controller");
const controllerUsers = require("../controllers/users.Controller");

const router = express.Router();

//Game
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerUsers.authenticate, controllerGames.gamesAddOne);

router.route("/games/:gameID")
    .get(controllerGames.gamesGetOne)
    .put(controllerUsers.authenticate, controllerGames.gamesFullUpdateOne)
    .patch(controllerUsers.authenticate, controllerGames.gamesPartialUpdateOne)
    .delete(controllerUsers.authenticate, controllerGames.gamesDeleteOne)

//publisher
router.route("/games/:gameID/publishers")
    .post(controllerUsers.authenticate, controllerPublisher.publisherAddOne)
    .get(controllerPublisher.publisherGetAll);

router.route("/games/:gameID/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne)
    .put(controllerUsers.authenticate, controllerPublisher.publisherFUllUpdateOne)
    .delete(controllerUsers.authenticate, controllerPublisher.publisherDeleteOne);


//users routes
router.route("/users")
    .post(controllerUsers.register);

router.route("/users/login")
    .post(controllerUsers.login);




module.exports = router;
