const express = require("express");
const game = require("../controller/game");
const router = express.Router();

router.route("/").get(game.getAllGames);
router.route("/:gameId").get(game.getOneGame);


module.exports = router;