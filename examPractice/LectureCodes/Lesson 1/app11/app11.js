const express = require("express");
const path = require("path");

const app = express();

app.set("port", 3000);

app.get("/", function(req, res) {
    console.log("GET REcieved");
    res.status(404).send("We did it");
});

app.get("/json", function(req, res) {
    console.log("JSON request recieved");
    res.status(200).json({"jsonData": true});
});

app.get("/file", function(req, res) {
    console.log("File request recieved");
    // console.log(__dirname+"\\app11.js")
    res.status(200).sendFile(path.join(__dirname, "app11.js"));
});

const server = app.listen(app.get("port"), function() {
    console.log("Listening to port ", server.address().port)
})
