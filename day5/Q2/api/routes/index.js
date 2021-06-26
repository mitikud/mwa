const express = require("express");
const controllerGames = require("../controllers/gameController");

const controllerPublisher = require("../controllers/publisherController");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
    
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdate)
    .patch(controllerGames.gamesPartialUpdate)
    .delete(controllerGames.gamesDeleteOne);


router.route("/games/:gameId/publishers")
    .post(controllerPublisher.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne)
    .post(controllerPublisher.publisherFullUpdateOne);
    
module.exports = router ;