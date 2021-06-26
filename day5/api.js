const express = require("express");
const path = require("path");
require("./api/data/db");

const route = require("./api/routes");

const app = express();



app.use(function(req, res, next){
    console.log(req.method, res.url)
    next();
})
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", route);

app.use(express.static(path.join(__dirname, "public")));

app.set("port", 5000);
const server = app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("server is started at the port "+ port);
});