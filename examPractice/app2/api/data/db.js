const mongoose = require("mongoose");
require("./games-model")
const dbName = "meanGames";

const dbURL = "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function(){
	console.log("Mongoose connected to"+dbURL);
});
mongoose.connection.on("disconnected", function(){
	console.log("Mongoose disconnected");
});
mongoose.connection.on("err", function(err){
	console.log("Mongoose connection error"+ err);
});
process.on("SIGINT", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected by app termination");
		process.exit(0);
	});
});
process.on("SIGTERM", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected by app termination");
		process.exit(0);
	});
});
process.once("SIGUSR2", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected by app termination");
		process.kill(process.pid,"SIGUSER2");
	});
});