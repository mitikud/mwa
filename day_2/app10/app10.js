const express = require("express");
const app = express();

//app.listen(3000);
app.set("port", 3000);
//app.listen(app.get("port"));
//console.log("Listening to port 3000");
const server = app.listen(app.get("port"), function(){
	const port = server.address().port;
	console.log("Listening to port" + app.get("port"));
	
})

