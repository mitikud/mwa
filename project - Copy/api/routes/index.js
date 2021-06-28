const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");
const playerController = require("../controllers/playerController")

router.route("/teams")
.get(teamsController.teamsGetAll)
.post(teamsController.addOneTeam)

router.route("/teams/:teamId")
.get(teamsController.teamsGetOne)

router.route("/teams/:teamId/players")
.get()
.put()
.post(playerController.playerAddOne)
.delete()


module.exports = router;