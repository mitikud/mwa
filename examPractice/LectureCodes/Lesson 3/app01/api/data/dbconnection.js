const MongoClient = require("mongodb").MongoClient;

const dbName = "meanGames";
const dburl = "mongodb://localhost:27017/"+dbName;

let _conncetion = null;
const open = function() {
    MongoClient.connect(dburl, {useUnifiedTopology: true}, function (err, client) {
        if(err) {
            console.log("DB conncetion failed!");
            return;
        }

        _conncetion = client.db(dbName);
        console.log("DB conncetion open")//, _conncetion);
    })
}

let get = function() {
    return _conncetion;
}

module.exports = {
    open: open,
    get: get
}