const mongoose = require("mongoose")
const Student = mongoose.model("Student");

module.exports.getAllStudents = function(req,res){
    Student.find().exec(function(err,data){
        res.status(200).json(data)
    })
}

module.exports.getOneStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        Student.findById(id).exec(function(err,data){
            res.status(200).json(data)
        })
    }
    
}

module.exports.getCoursesForStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id; //students id
        Student.findById(id).exec(function(err,data){

            res.status(200).json(data.courses)
        })
    }
}

module.exports.getCourseByIdInStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        const cid = req.params.cid;
        Student.findById(id).exec(function(err,data){
            let courses = data.courses;
            let course = courses.filter(elem =>elem._id == cid);
            res.json(course)
            
        })
    }
    
}

module.exports.addCourseToStudent = function(req,res){
    if(req.params && req.params.id){
        Course.findOne().exec(function(err,data){
            Student.findByIdAndUpdate(req.params.id,{$set:{courses:[data]}}).exec(function(err,student){
                res.status(200).json(student)
            })
        })
    }
}