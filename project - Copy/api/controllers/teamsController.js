//const dbConnection = require("../../resourse/dbconnection");
const mongoose = require("mongoose");
const Team =  mongoose.model("Team");

module.exports.teamsGetAll = (req, res)=> {
	const response = {
	    status: 200,
	    message: res
	}
	let offset = 0;
	let count = 5;
	const maxCount = 8;
       
    
	if (req.query && req.query.offset) {
	    offset = parseInt(req.query.offset);
	}
	//Add Query string type checking to the teams controller.
	if (isNaN(offset) || isNaN(count)) {
	    res.status(400).json(
		{
		     "message": "QueryString offset or count are not valid number" 
		});
	    return;
	}
	if (req.query && req.query.count) {
	    count = parseInt(req.query.count);
	    if (count > maxCount) {
		// count = maxCount;
		console.log("maxCount exceeded");
		res.status(400).json({ "message": "Can not exceed count of " + maxCount });
	    }
	}
    
    
	Team.find().exec((err, teams)=> {
	    if (err) {
		console.log("Error finding teams ", err);
	       
		response.status = 400;
		response.message = err;
	    } else {
	       console.log("Found teams", teams.length);
	       
		response.status = 200;
		response.message = teams;
	    }
	    res.status(response.status).json(response.message);
	});
    }

    module.exports.teamsGetOne = (req, res)=> {
	const response = {
	    status: 200,
	    message: res
	}
       
	console.log("Jeson request is recieved");
    
	const teamId = req.params.teamId;
	  
    
	Team.findById(teamId).exec((err, team)=> {
	    if (err) {
		console.log("Found team error ", err);
	       
		response.status = 400;
		response.message = err;
	    	}
		else if(!team){
			    console.log("teamId not found");
			    response.status= 400;
			    response.message = {"message":"Team Id not found"}

		} else {
	       console.log("Found teams", team);
	       
		response.status = 200;
		response.message = team;
	    }
	    res.status(response.status).json(response.message);
	});
    }

    module.exports.addOneTeam= (req, res)=> {
	console.log("Add one team");
	  let newTeam = {
	    country: req.body.country,
	    win: parseInt(req.body.win),
	    lost: parseInt(req.body.lost),
	    points: parseInt(req.body.points),
	    name: req.body.name,
	    age: parseInt(req.body.age),
	    position: req.body.position,
	    players: [],
	    
	};
	Team.create(newTeam, (err, team)=> {
	    const response = {
		status: 200,
		message: team
	    }
	    if (err) {
		response.status = 400;
		response.message = err;
	    } else {
		response.status = 200;
		response.message = team;
	    }
	    res.status(response.status).json(response.message);
    
	})
    }