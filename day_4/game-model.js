const mongoose= require("mongoose");


const gameSchema= new mongoose.Schema({
	name:{
		type:String,
		require:true
	},
	location:{
		address:String,
		coordinates:[Numbers]//longitude(E/W) and Latitude(N/S)

	}
	
});
const gameSchema= new mongoose.Schema({
title: {
	type: String,
	require:true
},
price : Number,
year: Number,
minAge:{
	type:Number,
	min:4
	
},
designers : [String],
miniPlayer:{
	type:Number,
	min:1,
	max:10
},
maxiPlayer:{
	type:Number,
	min:1,
	max:10
},
players : Number,
rate: {
	type:Number,
	min:1,
	max:5,
	"default":1	
},
publisher:publisherSchema
});
//compiling the model

mangoose.mode("Game", gameSchema,"games")