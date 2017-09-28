// This is my constructor for the cloze flashcards.
function clozeCard(fullText, cloze) {
    // This allows users not to have to put new in front of every new instance.
    if (!(this instanceof clozeCard)) {
        return new clozeCard(fullText, cloze);
    }

    this.fullText = fullText;
    this.cloze = cloze;

    // This is where I push the index of the matching words found in the fulltext array.
    var array = [];

    // Here I split both the parameters entered in the new instance for comparison.
    var splitText = fullText.split(" ")
    var splitCloze = cloze.split(" ")

    // Here is my loop that finds and pushes the index of the matching words if words don't match it sends a -1. 
    for (var i = 0; i < splitCloze.length; i++) {
        array.push(splitText.indexOf(splitCloze[i]));
    }

    // Here I set my cloze checker variable to true.
    var good = true;

    // Here I use a loop to check every item inside of the matching array. If there is a -1 then I send an error and set good to false.
    for (var k = 0; k < array.length; k++) {
        if (array[k] == -1) {
            this.partial = "ERROR: YOUR FULL TEXT AND CLOZE DON'T MATCH"
            good = false;
        }
    }

    // Here if everything matches I replace the cloze inside of the full text too "...".
    if (good) {
        this.partial = fullText.replace(cloze, "....");
    }
}

module.exports = clozeCard;