function flashCard(front, back) {
    if (!(this instanceof flashCard)) {
        return new flashCard(front, back);

    }
    this.front = front;
    this.back = back;
}

module.exports = flashCard;