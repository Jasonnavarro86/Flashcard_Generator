 function clozeCard(fullText, cloze) {
    if (!(this instanceof clozeCard)) {
        return new clozeCard(fullText, cloze);

    }
    var array = [];

    this.fullText = fullText;

    this.cloze = cloze;

    var splitText = fullText.split(" ")
    
    var splitCloze = cloze.split(" ")

    for (var i = 0; i < splitCloze.length; i++) {

        array.push(splitText.indexOf(splitCloze[i]));
    }
    
    var spliceText = splitText.splice(array[0], splitCloze.length);
    // var part = splitText.join(" ");
    
    // this.partial = part;
    // part;
    var good = true;
    for (var k = 0; k < array.length; k++) {
        
        if (array[k]  == -1 ) {
            this.partial = "ERROR: YOUR FULL TEXT AND CLOZE DON'T MATCH"
            good = false;
        }
    
    }
    if(good){
        this.partial = fullText.replace(cloze, "...");
    }
    


}



module.exports =  clozeCard;
// || array.length !=  splitCloze.length