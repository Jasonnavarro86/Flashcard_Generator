var clozeCard = require('./ClozeCardGenorator.js')
var inquirer = require("inquirer")
var http = require('http')
var fs = require('fs')
var ClozeCard = require('./ClozeCardGenorator.js')
var JSONS = require('./cloze')

// Score Keeper and loop Variable 
var score = 0;
var loopInt = 0;


// I create my new constructors 
var constructorArray = [{
        question: ClozeCard("Bob Marley's real name is Robert Nesta Marley", 'Robert Nesta Marley')
    },
    {
        question: ClozeCard('Bob Marley was born in Nine Mile Jamaica', 'Nine Mile Jamaica')
    },
    {
        question: ClozeCard('The Wailers was the name of the group where Marley started his career', 'The Wailers')
    },
    {
        question: ClozeCard('Marley was bullied and derogatorily nicknamed White Boy by his neighbors growing up', 'White Boy')
    },
    {
        question: ClozeCard("Marley's first hit outside Jamaica was No Woman No Cry", 'No Woman No Cry')
    }
]

// Welcome logs
console.log("\nWelcome to Bob Marley Trivia");
console.log("________________________________\n");



// This function prompts Do You Want To Play? 
var startGame = function () {

    inquirer
        .prompt([{
            type: 'confirm',
            message: "Want To Play?\n",
            name: 'confirm',
            default: true
        }, ])
        .then(function (inquirerResult) {
            if (inquirerResult.confirm == false) {
                console.log("\nSorry To Hear, Come Back When You Want To Play!\n");
            } else {
                generateQuestions();
            }
        });
}
startGame();
// Main Game Generator 
var generateQuestions = function () {

    if (loopInt < constructorArray.length) {

        inquirer
            .prompt([{

                    message: constructorArray[loopInt].question.partial,
                    name: 'answer',

                },

            ])
            .then(function (inquirerResult) {

                if (inquirerResult.answer == constructorArray[loopInt].question.cloze.toLowerCase()) {
                    score++;
                }

                loopInt++;
                generateQuestions();

            })
    } else {
        console.log("\nThank You For Playing Bob Marley Trivia! You answered " + score + " correct out of 5.\n");
    }
}