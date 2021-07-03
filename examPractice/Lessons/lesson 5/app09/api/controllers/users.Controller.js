const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");


module.exports.register = function (req, res) {
    console.log("controller register:");
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
        };



        User.create(newUser, function (err, user) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(user);
            }
        })
    })

}

module.exports.login = function (req, res) {

    console.log("controller Login");
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            res.status(500).json(err);
        }

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log("Err", err)
                    res.status(400).json({ "message": "unauthorized" });
                } else {
                    if (result) {
                        console.log("User found", user);
                        const token = jwt.sign({ name: user.name }, "cs572", { expiresIn: 3600 })
                        res.status(200).json({ success: "true", token: token });
                    }
                }
            })
        } else {
            res.status(400).json({ "message": "unauthorized" });
        }
    })
}