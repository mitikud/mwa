const express = require("express");
const { controller, abc } = require("../controller/controller");

const route = express.Router();

route.post("/:number1",controller)

route.post("/abc",abc)


module.exports = route;