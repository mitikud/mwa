const express = require("express");
const router = express.Router();
const controllerGames = require("../controller/games.controllers");
router.use(function(req,res,next){
	console.log(req.method, req.url);
	next();
});

router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games/new").post(controllerGames.gamesGetOne);
module.exports = router;

//Routting 
//HTTP Method, Path and callBack function

/* router.get("/", function(req, res){
	console.log("Get Recieved ");
	//res.status(404).send("Server respond that the get request is recieved");
	res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
	console.log(res.status);
}); */

/* router.get("/json", function(req,res){
	console.log("JSON request recieved ");
	res.status(200).json({"jsonData":true})
	//res.json({"jsonData":true})
});

router.get("/file", function(reqq,res){
	console.log("File request recieved");
	res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
}) */