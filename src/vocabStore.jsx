var Firebase = require("firebase");
var Vocab = new Firebase("https://def.firebaseio.com/Vocab");
var Util = require("./util");

var Store = function() {
    function onVocab(callback) {
        Vocab.on("value", function(data) {
            if (callback && typeof callback === "function") {
                callback(Util.objectToArray(data.val()));
            }
        });
    }

    function offVocab() {
        Vocab.off("value");
    }

    function addVocab(vocab, callback) {
        if (!vocab) { return; }
        var data = Vocab.push({
                vocab: vocab.vocab,
                definitions: vocab.definitions,
                examples: vocab.examples
            }, function(err) {
                if (err) { alert(err); }
                if (callback && typeof callback === "function") { callback(err, data.key()); }
            });
        }
    
    function updateVocab(vocab, callback) {
        if (!vocab) { return; }
        Vocab.child(vocab.id).update({
            vocab: vocab.vocab,
            definitions: vocab.definitions,
            examples: vocab.examples
        }, function(err) {
            if (err) { alert(err); }
            else { 
                if (callback && typeof callback === "function") { callback(); }
            }
        });
    }
    
    return {
        addVocab: addVocab,
        updateVocab: updateVocab,
        onVocab: onVocab,
        offVocab: offVocab
    };
}();

module.exports = Store;


