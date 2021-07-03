const express = require("express");
const path = require("path");

const app = express();

app.set("port", 3000);

// app.get("/", function(req, res) {
//     console.log("GET REcieved");
//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
    
// });

// app.use("/public",express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), function() {
    console.log("Listening to port ", server.address().port)
})
