const fs = require("fs");

const onFileLoad = function () {
    console.log("2: Got a file");
}

console.log("1: Get a file");
const file = fs.readFileSync("shortFile.txt", onFileLoad);
console.log("3: Add end");