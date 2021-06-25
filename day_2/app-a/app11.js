var express = require("express");
var app = express();
app.set("port", 3000);
app.get("/", function(){
	console.log("GET received");
	
	res.status(404).send("Received your GET request");
});

var server = app.listen(app.get("port"), function(){
	var port = server.address().port;
	console.log("Listening to port" + port);
});