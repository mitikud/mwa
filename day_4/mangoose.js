const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/meanGamesDb"
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on("connected", function (){
	console.log("Mongoose connected to " + dbURL)});

mongoose.connection.on("disconnected", function (){
	console.log("Mongoose disconnected");})

mongoose.connection.on("error", function (err){
	console.log("Mongoose connection error " + err);});



process.on("SIGINT", function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected by app termination");
		process.exit(0);
	});
	
})
process.on("Sigterm", function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected by app termination");
		process.exit(0);
	});
	
})
process.on("sigursr2", function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected by app restart");
		process.kill(process.pid)
	});
	process.exit(0);
})