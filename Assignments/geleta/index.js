const express = require("express")

const app = express();

const path = require("path")

const router = require("./route/route")
const anotherroute = require("./route/anotherroute")
// app.use("/abcd",route);
// app.use("/abc",express.static(path.join(__dirname,"public")))

const db = require("./db/db").open()
app.set("port",3000)
app.use(express.json({extended:false}))

app.use("/",router)
app.use("/",anotherroute)

const server = app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("app running on ... ",port)
});

