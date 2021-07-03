const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");

router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameID").get(controllerGames.gamesGetOne);

module.exports = router;
