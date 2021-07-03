const mongoose=require("mongoose");
require("../model/Games");
 const dbName="meanGames";
 const url="mongodb://localhost:27017/"+dbName;
 mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
 mongoose.connection.on("connected",function(){
     console.log("Mongoose Connected",url);
 });
 mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disonnected");
});
mongoose.connection.on("error",function(err){
    console.log("Mongoose Connection erroe",err);
});
process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Send disconect to mongoose because of application termonation");
        process.exit(0);
    })
});

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Send disconect to mongoose because of application termonation");
        process.exit(0);
    })
});
process.on("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("Send disconect to mongoose because of application restart");
        process.kill(process.pid,"SIGUSR2")
    })
});