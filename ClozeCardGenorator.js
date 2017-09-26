module.exports = function clozeCard(fullText, cloze) {
    if (!(this instanceof clozeCard)) {
        return new clozeCard(fullText, cloze);

    }
    this.fullText = fullText;
    this.cloze = cloze;
    this.partial = fullText.replace(cloze, "...");
    if(this.partial == fullText){
        this.partial = "ERROR: YOUR CLOZE IS NOT IN THE FULL TEXT"
    }
        
    

}

