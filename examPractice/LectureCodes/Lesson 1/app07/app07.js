const child_process = require("child_process");

console.log("1: app start");
const newProcess = child_process.spawn("node", ["computation/_fibonacci"], {stdio: "inherit"});
//const fs = require("./computation/_fibonacci");
console.log("3: app end");