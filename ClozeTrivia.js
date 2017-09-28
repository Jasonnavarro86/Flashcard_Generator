var inquirer = require("inquirer")
var ClozeCard = require('./library/ClozeCardGenorator.js')
var ClozeJson = require('./cloze')

// Score Keeper.
var score = 0;

// for looping arrays in functions.
var loopInt = 0;

// for looping array in required json.
var jsonNum = 0;

// I need a never resetting number to allow users to create up to 5 cards with 5 questions each and reading that array.
var staticNum = 0;

// This tracks how many cards are made.
var madeNum = 1;

// for storing the user generated Full Text of the cloze. 
var createFullText = [];

// for storing the new instance of our cloze constructor with the Full Text and inputted cloze. 
var newUserConstructor = [];

// Here I store the new card's fulltext, cloze, and partial.
var storeNewCard = [];

// I push up after every card is made
var displayCard = [];


// Our Welcome Console Log
console.log("\n______________________________________________________________________________\n \nWelcome To CLOZE-CITY! Here You Can Play Trivia or Create Your Own Cloze Cards!\n");

// START: This function starts the game and asks the user what they want to do then runs a new function on their response.
var startGame = function () {

    inquirer
        .prompt([{
            type: "list",
            message: "What Would You Like To Do?",
            choices: ["Play Bob Marley Trivia", "Play Movie Trivia", "Play NBA Nick-Name Trivia", "Build My Own Cloze Card", "Play Your My Made Cards", "Im Done"],
            name: "answer"
        }, ])
        .then(function (inquirerResult) {

            switch (inquirerResult.answer) {
                case "Play Bob Marley Trivia":
                    jsonNum = 0;
                    TriviaQuestions()
                    break;
                case "Play Movie Trivia":
                    jsonNum = 1;
                    TriviaQuestions()
                    break;
                case "Play NBA Nick-Name Trivia":
                    jsonNum = 2;
                    TriviaQuestions()
                    break;
                case "Build My Own Cloze Card":
                    createClozeFull()
                    break;
                case "Play Your My Made Cards":
                    pickCard()
                    break;
                default:
                    console.log('---\nHave A Great Day!---\n');
            }
        });
}
// END
startGame();

// START: This is the Trivia Game starter for pre generated cloze cards.
var TriviaQuestions = function () {

    // I only run the inquirer(rounds) the number of questions length.
    if (loopInt < ClozeJson[jsonNum].FullText.length) {

        // I CREATE NEW INSTANCES OF CLOZE CONSTRUCTORS DYNAMICALLY 
        var constructorArray = {
            new1: ClozeCard(ClozeJson[jsonNum].FullText[loopInt], ClozeJson[jsonNum].Cloze[loopInt])
        }
        // The Messages Changes when the constructorArray changes every round.
        inquirer
            .prompt([{
                message: constructorArray.new1.partial,
                name: 'answer',
            }, ])
            .then(function (inquirerResult) {
                // Here I compare their input with the cloze and increase the score if it matches.
                if (inquirerResult.answer == constructorArray.new1.cloze.toLowerCase()) {
                    score++
                }
                // Here I increase the loop int and run this function again to traverse the json.
                loopInt++
                TriviaQuestions()
            })
    } 
    // Here if loop int is over the questions .length we end the game and print out the score and reset for next game.
    else {
        console.log("\n---Thank You For Playing " + ClozeJson[jsonNum].Category + "! You answered " + score + " correct out of 5.---\n");
        score = 0;
        loopInt = 0;
        startGame()
    }
}
// END

// START: Here I allow users to create their own cloze cards.
function createClozeFull() {
    // If the user tries to make more than 5 cards we console.log and reset.
    if (madeNum == 6) {
        console.log("\n---Sorry You Can Only Build 5 Cards at a Time.---\n");
        startGame();
    } else {
        // I only allow the user to make 5 questions per card.
        if (loopInt < 5) {
            // There are the instructions on how to make the card. 
            inquirer
                .prompt([{
                    message: ClozeJson[3].FullText[loopInt],
                    name: 'answer',
                    // I check to see if the user is inputting some value if not I rerun the same question with instructions. 
                    validate: function (input) {
                        if (input === '') {
                            console.log('\n---Please provide Full Text---\n');
                            return false;
                        } else {
                            return true;
                        }
                    }
                }, ])
                
                .then(function (inquirerResult) {

                    // HERE I store what the user inputted they want the full text to be then push it into an array.
                    createFullText.push(inquirerResult.answer)
                    // Here I run the second part of the users input and find out what part of the text is the cloze. 
                    createClozePartial();
                })
                // If the user made 5 questions I print a confirmation and restart the game.
        } else {
            displayCard.push("#" + madeNum + ' made')
            madeNum++
            loopInt = 0;
            console.log('\n---Nicely Done! Your New Cloze Card is Made---\n');
            startGame();
        }

    }
}
// END

// START: Here I take the users full text and their cloze and create a new instance of the CLOZE Constructor with their answers and store them.
function createClozePartial() {

    inquirer
        .prompt([{
            // There are the instructions on how to make the cloze. 
            message: ClozeJson[3].Cloze[loopInt],
            name: 'answer',
            validate: function (input) {
                if (input === '') {
                    console.log('\n---Please provide Cloze Text---\n');
                    return false;
                } else {
                    return true;
                }
            }

        }])
        .then(function (inquirerResult) {
            // This is where I create the new instance of the CLOZE CARD constructor. 
            newUserConstructor.push( ClozeCard(createFullText[staticNum], inquirerResult.answer) )

            // When I stringify the json I pushed in newUserConstructor (a line above) it removes the 'ClozeCard' from the json and formats it.
            var stringNew = JSON.stringify(newUserConstructor);
            // Here I parse the new json.
            var parseNew = JSON.parse(stringNew);
            // Here is where I store the users new cloze card (fulltext, cloze, and partial).
            storeNewCard.push(parseNew[staticNum].partial)

            // I increment my loops 
            loopInt++
            staticNum++
            
            createClozeFull();
        })

}
// Here once a card is made I push it to a list and  store it for the user to come back and play it when ever they want.
function pickCard() {
    // If a card hasn't been made yet then this wont work and inform the user why.
    if (displayCard[0] == undefined) {
        console.log("\n----Sorry You Have Not Built A Card Yet----\n");
        startGame();
    } else {
        // Here the user chooses from their made cards.
        inquirer
            .prompt([{
                type: "list",
                message: "Chose One Of Your New Cards",
                choices: displayCard,
                name: "answer"
            }, ])
            // Depending on the card the user chooses display number changes to run through the UserCreatedArray.
            .then(function (inquirerResult) {

                switch (inquirerResult.answer) {
                    case "#1 made":
                        displayNum = 0;
                        showCard()
                        break;
                    case "#2 made":
                        displayNum = 5;
                        showCard()
                        break;
                    case "#3 made":
                        displayNum = 10;
                        showCard()
                        break;
                    case "#4 made":
                        displayNum = 15;
                        showCard()
                        break;
                    case "#5 made":
                        displayNum = 20;
                        showCard()
                        break;
                    default:
                        console.log('\n---Have A Great Day!---\n');
                }
            });
    }
}
// Here I let the user play their cards the same as the trivia. 
function showCard() {
    
    if (loopInt < 5) {
        inquirer
            .prompt([{
                message: storeNewCard[displayNum],
                name: 'answer',
            }, ])
            .then(function (inquirerResult) {

                var stringNew1 = JSON.stringify(newUserConstructor);
                var parseNew1 = JSON.parse(stringNew1);
             
                
               var answerCheck = parseNew1[displayNum].cloze;
                if (inquirerResult.answer == answerCheck) {
                    score++
                }

                loopInt++
                displayNum++
                showCard()

            })
    } else {
        console.log("\n---Nice Job! You answered " + score + " correct out of 5.---\n");
        score = 0;
        loopInt = 0;
        startGame()

    }
}




