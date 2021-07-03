const mongoose = require("mongoose");
const Team =  mongoose.model("Team");
const success = 200;
const errorFromClient = 404;
const errorFromServer = 500;
//const 
const _addPlayer= function(req, res, team) {
	console.log(req.body)
	const newPlayer = {
		name:req.body.name,
	 	age:parseInt(req.body.age),
		position:req.body.position
	}
	if(!team.players){
		team.players = []
	}
	team.players.push(newPlayer);
	team.save(function(err, updateTeam) {
	const response= {status: success, message: updateTeam };
	if (err) {
		console.log(err)
		response.status= errorFromServer;
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
		const response= {status: success, message: []};
		if (err) {
			console.log("Error finding player");
			response.status= errorFromServer; 
			response.message= err;
		} 
		
		else if (!team) {
			console.log("teamId is not found in database", teamId);
			response.status= errorFromClient;
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
	const teamId = req.params.teamId;

	Team.findById(teamId).select("players").exec((err, player)=>{
		console.log(player)
	   if(err){
		res.status(errorFromServer).json(err)
	   } else {
		   	   
	    res.status(success).json(player);
	   }
	})
    }


module.exports.playerUpdate = (req, res)=>{
    
	
	const teamId = req.params.teamId;
	console.log(req.body)
	Team.findById(teamId).exec((err, team)=>{
		const response = {
	    status: success,
	    message: team
	}
	    if (err) {
	       response.status = errorFromClient;
		response.message = err;
	    } else if (!team){
		response.status = errorFromClient;
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
    
	
	const teamId = req.params.teamId;
	
	Team.findById(teamId).exec((err, team)=>{
		const response = {
	    status: success,
	    message: team
	}
	    if (err) {
	       response.status = errorFromClient;
		response.message = err;
	    } else if (!team){
		response.status = errorFromClient;
		response.message = { "message": "Publisher not found" }
	    } else {
		team.players = []
		team.save()
		response.message = team.players;
	    }
	    res.status(response.status).json(response.message);
	})
    }

     module.exports.deleteOnePlayer = (req, res)=>{
    
	const teamId = req.params.teamId;
	const playerId = req.params.playerId;
	
	Team.findById(teamId).exec((err, team)=>{
		const response = {
	    status: success,
	    message: team
	}
	console.log(team)
	    if (err) {
		    console.log(err)
	       response.status = errorFromClient;
		response.message = err;
	    } else if (!team){

		response.status = errorFromClient;
		response.message = { "message": "Publisher not found" }
	    } else {
		 console.log(team.players)
		team.players.id(playerId).remove();
		console.log(team.players)
		team.save()
		response.message = team.players;
	    }
	    res.status(response.status).json(response.message);
	})
    }