const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");
const playerController = require("../controllers/playerController")

router.route("/teams")
.get(teamsController.teamsGetAll)
.post(teamsController.addOneTeam)

router.route("/teams/:teamId")
.get(teamsController.teamsGetOne)
.put(teamsController.teamsFullUpdate)
.patch(teamsController.teamsPartialUpdate)
.delete(teamsController.teamDeleteOne)

router.route("/teams/:teamId/players")
.get(playerController.getOnePlayer)
.put(playerController.playerUpdate)
.post(playerController.playerAddOne)
.delete(playerController.playerDelete)

router.route("/teams/:teamId/players/:playerId")
.delete(playerController.deleteOnePlayer)
// .post(playerController.playerUpdate)

module.exports = router;