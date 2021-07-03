const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
	city : String,
	address:String,
	postCode: Number
});
const jobsSchema = new mongoose.Schema({
	title: {
		type: String,
		required : true
	},

	salary: {
		type: Number,
		required : true
	},	
	location : locationSchema,
	description:{
		type: String,
		required:true 
	},
	experience: String,
	skills : [String],
	postDate : Date
});

mongoose.model("Job", jobsSchema, "jobs");
