const express =  require("express");
const path= require("path");
const app = express();
app.set("port", 5000);
require("./api/data/db");
const routes = require("./api/routes/index")
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use("/api", routes);

const server =  app.listen(app.get("port"), function(){
	const PORT = server.address().port;
	console.log("Server is running on port: "+ PORT);
});