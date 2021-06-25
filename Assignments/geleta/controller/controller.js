const { ObjectID } = require("mongodb").ObjectID;

const controller = function(req,res){
	const number1 = req.params.number1;
	const number2 = req.body.number2;

	
	res.status(200).json({"abc":number1*number2})
}
const abc = function(req,res){

	const postData = req.body.elem;

	const db = require("../db/db")
	// db.get().collection("games").findById(ObjectID("fdjlksdlkj")).(function(err,data){
	// 	console.log(data)
	// 	res.json(data)
	// })
	// res.status(200).json({"abc":postData})
}

module.exports = {abc:abc,controller:controller}