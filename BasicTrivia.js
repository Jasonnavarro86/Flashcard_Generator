var inquirer = require("inquirer")
var flashCard = require('./library/BasicCardGenorator.js')
var BasicJSON = require('./Basic');
// I create my new constructors 
// Score Keeper and loop Variable 
var score = 0;
var loopInt = 0;
var jsonNum = 0;

// Welcome logs
console.log("\n Welcome To Flash N Cloze\n");

// This function starts the game and asks the user what they want to do. 
var startGame = function () {

    inquirer
        .prompt([{
            type: "list",
            message: "What Would You Like To Do?",
            choices: ["Play Bob Marley Trivia", "Play Movie Trivia", "Play NBA Nick Name Trivia", "Build My Own Flash Card", "Build My Own Cloze Card", "Im Done"],
            name: "answer"
        }, ])
        .then(function (inquirerResult) {

            switch (inquirerResult.answer) {
                case "Play Bob Marley Trivia":
                    TriviaQuestions()
                    break;
                case "Play Movie Trivia":
                    jsonNum = 1;
                    TriviaQuestions()
                    break;
                case "Play NBA Nick Name Trivia":
                    jsonNum = 2;
                    TriviaQuestions()
                    break;
                case "Build My Own Flash Card":
                    
                    break;
                case "Build My Own Cloze Card":
                    
                    break;
                default:
                    console.log('Have A Great Day!');
            }
        });
}
startGame();

// Main Game Generator 
var TriviaQuestions = function () {
    // I create my new constructors 

    if (loopInt < BasicJSON[jsonNum].Questions.length) {

        var constructorArray = {
            question: flashCard(BasicJSON[jsonNum].Questions[loopInt], BasicJSON[jsonNum].Answers[loopInt])
        }

        inquirer
            .prompt([{
                message: constructorArray.question.front,
                name: 'answer',
            }, ])
            .then(function (inquirerResult) {

                if (inquirerResult.answer == constructorArray.question.back.toLowerCase()) {
                    score++;
                }
                loopInt++;
                TriviaQuestions();
            })
    } else {
        console.log("\nThank You For Playing " + BasicJSON[jsonNum].Category + "! You answered " + score + " correct out of 5.\n");
        startGame();
    }
}