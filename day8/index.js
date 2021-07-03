const express = require("express");
const app = express();
const path = require("path")

require("./data/db"); //always import before any routes
app.use(express.json({extended:false}))
app.set("port",5050);

const routes = require("./routes/routes")

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/api",routes)
app.use(express.static(path.join(__dirname, "public")));
const server = app.listen(app.get("port"),function(){
    console.log("Running on port ",server.address().port);
});
