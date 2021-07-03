const mongoose=require("mongoose");

const publisherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:String,
    location:{
        coordinates:{ 
            type:[Number],
            index:"2dsphere"
        }
    }
});

const reviewSchema= new mongoose.Schema({
    name: {
    type: String
    },
    rating: {
    type: Number,
    min: 0,
    max: 5
    },
    review: {
    type: String
    },
    createdOn: {
    type: Date,
    "default": Date.Now
    }
    });
    

const gameSchema=new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    price:Number,
    year:Number,
    reviews:[reviewSchema],
    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    minAge:{
        type:Number,
        min:2
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    designers:[String],
    publisher: publisherSchema

});

mongoose.model("Game",gameSchema,"games");