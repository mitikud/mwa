
const express = require("express");
const controllerGames = require("../controllers/gamesController");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
router.route("/games/:gameID").get(controllerGames.gamesGetOne);

module.exports = router;
