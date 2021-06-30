const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
	name:{
		type:String
	}, 
	age:{
		type: Number
	},
	position:{
		type: String
	}
})
const soccerSchema = new mongoose.Schema({
	country: {
		type: String
	},
	win:{
		type: Number
	},
	lose : {
		type:Number
	},
	points :{
		type:Number
	},

	players:[playerSchema]

});

mongoose.model("Team",soccerSchema, "teams");
