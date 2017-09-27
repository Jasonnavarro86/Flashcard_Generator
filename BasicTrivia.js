var inquirer = require("inquirer")
var http = require('http')
var fs = require('fs')
var flashCard = require('./BasicCardGenorator.js')
// I create my new constructors 
var constructorArray = [{
        question: flashCard("What is Bob Marley's real name?", 'Robert Nesta Marley')
    },
    {
        question: flashCard('Where was Bob Marley born?', 'Nine Mile Jamaica')
    },
    {
        question: flashCard('What was the name of the group where Marley started his career?', 'The Wailers')
    },
    {
        question: flashCard('Bob was bullied and derogatorily nicknamed what by his neighbors growing up?', 'White Boy')
    },
    {
        question: flashCard("What was Marley's first hit outside Jamaica?", 'No Woman No Cry')
    }
]
// Welcome logs
console.log("\nWelcome to Bob Marley Trivia");
console.log("________________________________\n");
// Score Keeper and loop Variable 
var score = 0;
var loopInt = 0;
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
    if (loopInt < 5) {
        inquirer
            .prompt([{
                    message: constructorArray[loopInt].question.front,
                    name: 'answer',
                },
            ])
            .then(function (inquirerResult) {
                if (inquirerResult.answer == constructorArray[loopInt].question.back.toLowerCase()) {
                    score++;
                }
                loopInt++;
                generateQuestions();
            })
    } else {
        console.log("\nThank You For Playing Bob Marley Trivia! You answered " + score + " correct out of 5.\n");
    }
}
var server = http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type':'text/html'});

    var myStream = fs.createReadStream(__dirname + '/flash.html', 'utf8');

    myStream.pipe(res);
    // res.end("\nYou answered " + score + " correct out of 5.\n")
})
 server.listen(2222);