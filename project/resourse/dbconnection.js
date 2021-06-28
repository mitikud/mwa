const MongoCLient = require("mongodb").MongoClient;
dbName = "meanSoccer";
const dbUrl = "mongodb://localhost:27017/"+dbName;
let _connection = null;
const open = () => {
	MongoCLient.connect(dbUrl,{useUnifiedTopology: true}, (err, client) =>{
		if(err){
			console.log("DB connection failed");
			return;
		}
		_connection = client.db(dbName);
		console.log("DB connection open ", _connection);
	})
}

let get = () => {
	return _connection;
}

module.exports = {
	open : open,
	get : get
}