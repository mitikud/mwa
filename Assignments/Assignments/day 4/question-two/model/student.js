const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    creditHour:{
        type: Number
    }
});

const studentSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    GPA:Number,
    
    courses:[courseSchema]

});

mongoose.model("Student",studentSchema,"students");