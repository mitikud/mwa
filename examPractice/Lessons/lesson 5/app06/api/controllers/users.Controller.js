const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

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