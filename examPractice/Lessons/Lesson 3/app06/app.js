const express = require("express");
const path = require("path");
require("./api/data/db");
const routers = require("./api/routes");

const app = express();

app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use("/api", routers);


const server = app.listen(app.get("port"), function() {
    console.log("Listening to port ", server.address().port)
})



