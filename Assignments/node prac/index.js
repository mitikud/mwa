const express = require("express");
const app = express();
const things = require("./things.js");

app.use('/things', things);
app.use(express.static('public'));
/* // Simple request timer logger middleware
app.use(function(req,res,next){
	console.log("A new request received " + Date.now())
	next()
}) */
// Simple request timer logger middleware
app.use("/hello",function(req,res,next){
	console.log("A new request received from hello " + Date.now())
	next()
})

//moved to riute folder
app.get('/', function(req, res){
	console.log("Hello world");
	res.send("hello from server")
})
app.get('/hello', function(req, res){
	console.log("Hello for the route");
	res.send("hello for the router")
})

app.post("/hello", function(){
	res.send("you have send from the post method")
})

app.get("/:id", function(req,res){
	res.send("hello id "+ req.params.id)
	console.log("hello id "+ req.params.id)
})

app.get("/:name/:id", function(req,res){
	console.log("Hello mr "+ req.params.name + " with id " + req.params.id)
	res.send("Hello mr "+ req.params.name + " with id " + req.params.id)
})



//app.use("port", 5000);

app.listen(5000, function(){
	console.log("server is stared from port 5000")
});
