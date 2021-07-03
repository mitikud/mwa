const express = require("express");
const router = express.Router();

router.route("/json").get(function(req, res) {
    console.log("JSON request recieved");
    res.status(200).json({"JsonData": true});
})
.post(function(req, res) {
    console.log("POST request recieved");
    res.status(200).json({"JsonData": false});
});

module.exports = router;
