const db = require("../data/dbconnection")

module.exports.getAllGames = function(req,res){
    const collections = db.get().collection("games");
    let count = 4;

    if(req.query && req.query.count ){
        count = parseInt(req.query.count);
        if(count > 8){
            count = 8;
        }
    }

    collections.find().limit(count).toArray(function(err,data){
        console.log(data);
        res.status(201).json(data);
    })

}