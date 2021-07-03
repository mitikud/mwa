require("./instantHello");
const talk = require("./talk");
const question = require("./talk/question");

talk.greeting();
talk.intro();

const question = question.ask("What is the meaning of life?");
console.log(question);