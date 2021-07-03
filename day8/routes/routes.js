const express = require("express");
const game = require("../controller/game");
const publisher = require("../controller/publisher");
const review = require("../controller/reviews");
const router = express.Router();

router.route("/games")
.get(game.getAllGames)
.post(game.createGame)

router.route("/games/:id")
.get(game.getOneGame)
.put(game.fullUpdateGame)
.patch(game.partialUpdate)
.delete(game.deleteGame)

// publisher routes
router.route("/games/:id/publisher")
.get(publisher.getPublisher)
.post(publisher.addPublisher)
.put(publisher.fullUpdatePublisher)
.delete(publisher.deletePublisher)

module.exports = router;


// review routes
router.route("/:id/review")
.get(review.getReview)
.post(review.addReview)
.put(review.fullUpdateReview)
.delete(review.deleteReview)

module.exports = router;