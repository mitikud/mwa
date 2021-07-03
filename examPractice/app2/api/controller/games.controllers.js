
//const gamesData = require("../data/games-data.json");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.gamesGetAll = function(req,res){
	/* console.log("JSON request received");
	//res.status(200).json({"jsonData":true});
	res.status(200).json(gamesData); */

	console.log("Get The Games");
	console.log(req.query);
	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset,10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	/* const pageGames =  gamesData.slice(offset, offset+count);
	re s.status(200).json(pageGames);*/

	Game.find().skip(offset).limit(count).exec(function(err,games){
		console.log("FOund games", games.length);
		res.json(games);
	});
};


/* module.exports.gamesGetOne =function(req,res){
	const gameId = req.params.gameId;
	console.log(gameId);
	//const theGame = gamesData[gameId];
	console.log('gamesData')
	const theGame = gamesData.filter(game=>
		game._id.$oid==gameId
	);
	console.log("GET game with gameId", gameId);
	res.status(200).json(theGame);

	//get Data from the body
	console.log("POST new game");
	console.log(req.body);
	//res.status(200).json(req.body);
}
*/
module.exports.gamesGetOne =function(req,res){
	const gameId = req.params.gameId;
	console.log(gameId);
	//const theGame = gamesData[gameId];
	
	
	console.log("GET game with gameId", gameId);
	Game.findById(gameId).exec(function(err,game){
		res.status(200).json(game);
	});
}; 