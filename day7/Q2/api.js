const express = require("express");
const path = require("path");
require("./api/data/db");
const route = require("./api/routes");
const app = express();



app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", route)
app.set("port", 5000);
const server = app.listen(app.get("port"), () =>{
	const PORT = server.address().port;
	console.log("Server is started at port", PORT);
});