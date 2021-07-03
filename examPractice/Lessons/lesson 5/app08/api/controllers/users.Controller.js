const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");


module.exports.register = function(req, res) {
    console.log("controller register:");

    const newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        name: req.body.name,
    };



    User.create(newUser, function(err, user) {
        if(err) {
            res.status(500).json(err);
        } else{
            res.status(201).json(user);
        }
    })
}

module.exports.login = function(req, res) {

    console.log("controller Login");
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}).exec(function(err, user) {
        if(err) {
            res.status(500).json(err);
        }

        if(user) {
            if(bcrypt.compareSync(password, user.password)) {
                console.log("User found", user);
                const token = jwt.sign({name: user.name}, "cs572", {expiresIn: 3600})
                res.status(200).json({success: "true", token: token});
            } else {
                console.log("password incorrect")
                res.status(400).json({"message" : "unauthorized"});
            }
        } else {
            res.status(400).json({"message" : "unauthorized"});
        }
    })
}