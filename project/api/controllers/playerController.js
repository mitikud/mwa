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


module.exports.getOnePlayer = (req, res)=>{
	console.log("Get one team request received");
	const teamId = req.params.Id;
	Team.findById(teamId).select("players").exec((err, player)=>{
		console.log(player)
	   if(err){
		res.status(500).json(err)
	   } else {
		   	   
	    res.status(200).json(player);
	   }
	})
    }


module.exports.playerUpdate = (req, res)=>{
    
	const response = {
	    status: 200,
	    message: team
	}
	const teamId = req.params.teamId;
	
	Team.findById(teamId).exec((err, team)=>{
	    if (err) {
	       response.status = 404;
		response.message = err;
	    } else if (!team){
		response.status = 404;
		response.message = { "message": "Publisher not found" }
	    } 
	    if(team){
		    _addPlayer(req,res,team)
	    }else {
		
		
		res.status(response.status).json(response.message);
	    }
	    
	})
    }

    module.exports.playerDelete = (req, res)=>{
    
	const response = {
	    status: 200,
	    message: team
	}
	const teamId = req.params.teamId;
	
	Team.findById(teamId).exec((err, team)=>{
	    if (err) {
	       response.status = 404;
		response.message = err;
	    } else if (!team){
		response.status = 404;
		response.message = { "message": "Publisher not found" }
	    } else {
		team.players = [];
		team.save()
		response.message = updatedteam.players;
	    }
	    res.status(response.status).json(response.message);
	})
    }