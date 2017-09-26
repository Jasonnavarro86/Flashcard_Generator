var clozeCard = require('./ClozeCardGenorator.js')
var GoodCloze = clozeCard("The president is George Washington", "George Washington")
var BadCloze = clozeCard("The president is George Washington", "Spaz")

console.log("\nNo Error");
console.log("Full Text: ", GoodCloze.fullText);
console.log("Cloze: ", GoodCloze.cloze);
console.log("Partial:", GoodCloze.partial + '\n');

console.log("\nError");
console.log("Full Text: ", BadCloze.fullText);
console.log("Cloze: ", BadCloze.cloze);
console.log("Partial: ", BadCloze.partial + '\n');