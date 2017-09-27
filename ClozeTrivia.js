var inquirer = require("inquirer")
var ClozeCard = require('./library/ClozeCardGenorator.js')
var BasicCard = require('./library/BasicCardGenorator.js')
var JSONS = require('./cloze')

// Score Keeper and loop Variable 
var score = 0;
var loopInt = 0;
var jsonNum = 0;

// Welcome logs
console.log("\n Welcome To Flash N Cloze\n");

// This function starts the game and asks the user what they want to do. 
var startGame = function () {

    inquirer
        .prompt([  {
            type: "list",
            message: "What Would You Like To Do?",
            choices: ["Play Bob Marley Trivia", "Play Movie Trivia", "Play NBA Nick Name Trivia", "Build My Own Flash Card", "Build My Own Cloze Card"],
            name: "answer"
          }, ])
        .then(function (inquirerResult) {
            if (inquirerResult.answer == "Play Bob Marley Trivia") {
                TriviaQuestions()
            }else if(inquirerResult.answer == "Play Movie Trivia"){ 
                jsonNum = 1;
                TriviaQuestions()
            }else if(inquirerResult.answer == "Play NBA Nick Name Trivia"){ 
                jsonNum = 2;
                TriviaQuestions()
            }else if(inquirerResult.answer == "Build My Own Flash Card"){ 
                
            }else if(inquirerResult.answer == "Build My Own Cloze Card"){ 
                
            }else {
                // generateQuestions();
            }
        });
}
startGame();


// Main Game Generator 
var TriviaQuestions = function () {
    // I create my new constructors 
var constructorArray = {
    question: ClozeCard(JSONS[jsonNum].FullText[itemNum], JSONS[jsonNum].Cloze[itemNum])
}
    if (loopInt < 5) {

        inquirer
            .prompt([{
                    message: constructorArray.question.partial,
                    name: 'answer',
                },
            ])
            .then(function (inquirerResult) {

                if (inquirerResult.answer == constructorArray.question.cloze.toLowerCase()) {
                    score++;
                }
                loopInt++;
                TriviaQuestions();
            })
    } else {
        console.log("\nThank You For Playing"+ +"! You answered " + score + " correct out of 5.\n");
    }
}