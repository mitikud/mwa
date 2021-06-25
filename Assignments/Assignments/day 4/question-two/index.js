const express = require("express");
const app = express();
require("./data/db"); //always import before any routes
require("./model/student");
app.set("port",3000);

const students = require("./routes/student")
app.use("/students",students)


const server = app.listen(app.get("port"),function(){
    console.log("Running on port ",server.address().port);
});
