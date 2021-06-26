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



module.exports = router ;