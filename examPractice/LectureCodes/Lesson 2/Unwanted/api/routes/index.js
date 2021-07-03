const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/gamesController");


router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameID").get(controllerGames.gamesGetOne);
router.route("/games/new").post(controllerGames.gamesAddOne);

module.exports = router;
