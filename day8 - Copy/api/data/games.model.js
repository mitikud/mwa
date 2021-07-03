const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
        name : {
            type :String,
            require : true
        },
        location :{
            address :String,
            coordinates : {
                type : [Number],
                index : "2dsphere"
            }
        }
}) ;
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },  //title is path String --schema type
    price: Number,
    year: Number,
    minPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: {
        type : Number,
        min : 4
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    designers: [String],
    publisher : [publisherSchema]
});

mongoose.model("Game", gameSchema); //compiling the model
//the third parameter is optional, if not provided mogoose will take the first argument make it lowercase and plural
