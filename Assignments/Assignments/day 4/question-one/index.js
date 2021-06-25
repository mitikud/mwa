const express = require("express");
const app = express();
app.set("port",3000);
require("./data/mangoose")
const games = require("./routes/game")

//db.open();

//open database connection here

app.use("/games",games)

const server = app.listen(app.get("port"),function(){
    console.log("Running on port ",server.address().port);
});
