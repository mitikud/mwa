
const express = require("express");
const path = require("path");




const app = express();
require("./api/data/db")
const routes = require("./api/routes/index");
app.set("port", 3000);
/* app.use(function(req,res,next){
	console.log(req.method, req.url);
	next;
}); */

app.use(express.static(path.join(__dirname,"public")))
//router.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));

app.use("/api",routes);//routes with out qoute 

const server = app.listen(app.get("port"), function(){
	const PORT = server.address().port;
	console.log("The server is running from port", PORT );
	
});