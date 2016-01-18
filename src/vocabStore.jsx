var Firebase = require("firebase");
var Vocab = new Firebase("https://def.firebaseio.com/Vocab");
var Util = require("./util");

var Store = function() {
    function on(callback) {
        Vocab.on("value", function(data) {
            if (callback && typeof callback === "function") {
                callback(Util.objectToArray(data.val()));
            }
        });
    }

    function off() {
        Vocab.off("value");
    }

    function add(vocab, callback) {
        if (!vocab || !vocab.vocab) { return; }
        var data = Vocab.push({
                vocab: vocab.vocab,
                definitions: vocab.definitions,
                examples: vocab.examples
            }, function(err) {
                if (err) { alert(err); }
                if (callback && typeof callback === "function") { callback(err, data.key()); }
            });
        }
    
    function update(vocab, callback) {
        if (!vocab || !vocab.id || !vocab.vocab) { return; }
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

    // delete is a js keyword
    function remove(id, callback) {
        Vocab.child(id).remove(callback);
    }
    
    return {
        add: add,
        update: update,
        delete: remove,
        on: on,
        off: off
    };
}();

module.exports = Store;


