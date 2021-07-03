const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},

	country: {
		type: String,
		require: true
	}
});

const reviewSchema = new mongoose.Schema({
	
	name: {
		type: String,
		require: true
	},

	review: {
		type: String,
		default: Date.now
	}
});
const gamesSchema=new mongoose.Schema({

	title: {
		type: String,
		require: true
	},
	price: Number,
	year: Number,
	minPlayers: Number,
	minAge: {
		type: Number,
		min: 4
	},
	rate: {
		type: Number,
		min: 1,
		max: 5,
		"default": 1
	},
	designers: [String],
	publisher: publisherSchema,
	review: [reviewSchema]
});

mongoose.model("Game", gamesSchema);