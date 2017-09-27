var flashCard = require('./BasicCardGenorator.js')


var question1 = flashCard("What is Bob Marley's real name?" , 'Robert Nesta Marley');
var question2 = flashCard('Where was Bob Marley born?' , 'Nine Mile Jamaica');


console.log('\nfront: ' , question1.front);
console.log('back: ', question1.back);

console.log('front: ' , question2.front);
console.log('back: ' , question2.back, '\n');
