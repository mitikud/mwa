const express = require("express")

const route = express.Router();

route.get("/",function(req,res){
	res.status(200).json({"abc":"a"})
})

route.get("/g",function(req,res){
	res.status(200).json({"abc":"abc"})
})

module.exports = route;