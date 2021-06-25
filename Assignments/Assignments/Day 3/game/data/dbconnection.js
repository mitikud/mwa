const MongoClient = require("mongodb").MongoClient;

const dbName = "meanGames";
const url = "mongodb://localhost:27017/"+dbName;

let _connection = null;

const open = function(){
    MongoClient.connect(url,{useUnifiedTopology: true}, function(err,client){
        if(err){
            console.log("DB encountered error");
        } 
        _connection = client.db(dbName);
    })
}

const get = function(){
    return _connection;
}

module.exports = {open: open, get:get}