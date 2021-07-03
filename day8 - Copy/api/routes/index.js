const express = require("express");
const router = express.Router();
const controller = require("../controller/games.controller");
const controllerPublisher= require('../controller/publisher.controller')



router.route("/games").get(controller.gamesGetAll);
router.route("/games").post(controller.gamesAddOne);

router.route("/games/:gameId").get(controller.getOne);
router.route("/games/:gameId/publisher").get(controllerPublisher.publisherGetOne);

module.exports = router;

