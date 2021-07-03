const fs = require("fs");


console.log("1: Get a file");
const file = fs.readFileSync("shortFile.txt", function () {
    console.log("2: Got a file");
})

console.log("3: Add end");