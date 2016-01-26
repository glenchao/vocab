var VocabModel = function(id, word, definitions, examples) {
    this.id = id || "";
    this.word = word || "";
    this.definitions = definitions || [];
    this.examples = examples || [];
}

module.exports = VocabModel;