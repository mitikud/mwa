const mongoose = require("mongoose");
require("./games-model");

const dbName = "meanGames";
const dbUrl = "mongodb://localhost:27017/"+dbName;

mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", ()=>{
    console.log("Mongoose connected to db "+ dbUrl);
});

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", (err)=>{
    console.log("Mongoose connection error "+err);
});

process.on("SIGINT", ()=>{
    mongoose.connection.close(()=>{
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    })
})

process.on("SIGTERM", ()=>{
    mongoose.connection.close(()=>{
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    })
})