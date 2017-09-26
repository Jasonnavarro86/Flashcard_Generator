var inquirer = require("inquirer");

function flashCard(front, back) {
    if (!(this instanceof flashCard)) {
        return new flashCard(front, back);
        Raven.captureException(e);
    }
    this.front = front;
    this.back = back;
}

var question1 = flashCard("What is Bob Marley's real name?" , 'Robert Nesta Marley');
var question2 = flashCard('Where was Bob Marley born?' , 'Nine Mile Jamaica');
var question3 = flashCard('What was the name of the group where Marley started his career?' , 'The Wailers');
var question4 = flashCard('Bob was bullied and derogatorily nicknamed what by his neighbors growing up?' , 'White Boy');
var question5 = flashCard("What was Marley's first hit outside Jamaica?" , 'No Woman No Cry');

console.log("\nWelcome to Bob Marley Trivia\n");

var score = 0;
inquirer
    .prompt([
        {
            type: 'confirm', 
            message: "Want To Play Bob Marley Trivia?",
            name:'confirm',
            default: true
        },
    {
        type: 'input', 
        message: question1.front,
        name:'answer1',
    },
    {
        type: 'input',
        message: question2.front,
        name: 'answer2',

    },
        {
        type: 'input',
        message: question3.front,
        name: 'answer3',
    },
    {
        type: 'input',
        message: question4.front,
        name: 'answer4',

    },
    {
        type: 'input',
        message: question5.front,
        name: 'answer5',

    },
 
])
.then(function(inquirerResult){


  
if(inquirerResult.answer1 == question1.back.toLowerCase()){
    score ++;
}
if(inquirerResult.answer2 == question2.back.toLowerCase()){
    score ++;
}
if(inquirerResult.answer3 == question3.back.toLowerCase()){
    score ++;
}
if(inquirerResult.answer4 == question4.back.toLowerCase()){
    score ++;
}
if(inquirerResult.answer5 == question5.back.toLowerCase()){
    score ++;
}
console.log("\n ________________________________\n");
 console.log("\nYou answered " + score + " correct out of 5.\n");


})

module.exports = {
    question1: question1,
    question2: question2,
    question3: question3,
    question4: question4,
    question5: question5
}

 