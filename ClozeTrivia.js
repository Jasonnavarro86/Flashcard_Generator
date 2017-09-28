var inquirer = require("inquirer")
var ClozeCard = require('./library/ClozeCardGenorator.js')
var BasicCard = require('./library/BasicCardGenorator.js')
var ClozeJson = require('./cloze')

// Score Keeper ,loop Variables, and custom card arrays.
var score = 0;
var loopInt = 0;
var jsonNum = 0;
var clozeNum = 0;
var createFullText = [];
var createClozeText = [];

// Welcome logs
console.log("\n Welcome To Flash N Cloze\n");

// This function starts the game and asks the user what they want to do. 
var startGame = function () {

    inquirer
        .prompt([{
            type: "list",
            message: "What Would You Like To Do?",
            choices: ["Play Bob Marley Trivia", "Play Movie Trivia", "Play NBA Nick Name Trivia", "Build My Own Cloze Card", "Show My Made Cards", "Im Done"],
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
                case "Build My Own Cloze Card":
                    createClozeFull()
                    break;
                case "Show My Made Cards":

                    break;
                default:
                    console.log('Have A Great Day!');
            }
        });
}
startGame();

// Main Game Generator 
var TriviaQuestions = function () {


    if (loopInt < ClozeJson[jsonNum].FullText.length) {

        // I CREATE NEW INSTANCES OF CLOZE CARDS DYNAMICALLY 
        var constructorArray = {
            question: ClozeCard(ClozeJson[jsonNum].FullText[loopInt], ClozeJson[jsonNum].Cloze[loopInt])
        }

        inquirer
            .prompt([{
                message: constructorArray.question.partial,
                name: 'answer',
            }, ])
            .then(function (inquirerResult) {

                if (inquirerResult.answer == constructorArray.question.cloze.toLowerCase()) {
                    score++
                }
                loopInt++
                TriviaQuestions()
            })
    } else {
        console.log("\nThank You For Playing " + ClozeJson[jsonNum].Category + "! You answered " + score + " correct out of 5.\n");
        score = 0;
        loopInt = 0;
        startGame()
    }
}


function createClozeFull() {
    if (clozeNum < 5) {
        inquirer
            .prompt([{
                message: ClozeJson[3].FullText[clozeNum],
                name: 'answer',
                validate: function (input) {
                    if (input === '') {
                        console.log('Please provide Full Text');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, ])
            .then(function (inquirerResult) {

                createFullText.push(inquirerResult.answer)

                createClozePartial();
            })
    } else {
        loopInt = 0;
        clozeNum = 0;
        console.log('Card Made');
        startGame();
    }
}

function createClozePartial() {

    inquirer
        .prompt([{
            message: ClozeJson[3].Cloze[clozeNum],
            name: 'answer',
            validate: function (input) {
                if (input === '' || input != createFullText[clozeNum]) {
                    console.log('Please Make Sure Your Cloze is part of the Full Text');
                    return false;
                } else {
                    return true;
                }
            }
        }])
        .then(function (inquirerResult) {

            createClozeText.push(inquirerResult.answer)
            loopInt++
            clozeNum++;
            createClozeFull();
        })

}

