const mongoose = require("mongoose");
const Team =  mongoose.model("Team");
const _addPlayer= function(req, res, team) {

	const newPlayer = {
		name:req.body.name,
	 	age:parseInt(req.body.age),
		position:req.body.position
	}
	team.players.push(newPlayer);
	team.save(function(err, updateTeam) {
	const response= {status: 200, message: updateTeam };
	if (err) {
		response.status= 500;
		response.message= err;
	} 
	else {
		response.status= 201;
		response.message= updateTeam.players;
	}
		res.status(response.status).json(response.message);
	});
}

module.exports.playerAddOne= function(req, res) {
	console.log("Add one player");
	const teamId= req.params.teamId;
	console.log("Get teamId ", teamId);
	Team.findById(teamId).exec(function(err, team) {
		const response= {status: 200, message: []};
		if (err) {
			console.log("Error finding player");
			response.status= 500; 
			response.message= err;
		} 
		
		else if (!team) {
			console.log("teamId is not found in database", teamId);
			response.status= 404;
			response.message= {"message": "teamId not found"};
		}
		if (team) {
			_addPlayer(req, res, team);
		} 
		
		else {
			res.status(response.status).json(response.message);
		}
	});
}