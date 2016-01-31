var Firebase = require("firebase");

var ref = new Firebase("https://def.firebaseio.com");
var Vocab = null;

ref.onAuth(function (authData) {
    if (authData) {
        Vocab = ref.child("vocab").child(authData.uid);
    }
    else if (Vocab) {
        Vocab.off("value");
        Vocab = null;
    }
});

var Store = function() {
    function on(eventType, callback) {
        Vocab.on("value", function(data) {
            if (callback && typeof callback === "function") {
                callback(data.val());
            }
        });
    }

    function off(eventType, callback) {
        Vocab.off("value", callback);
    }

    function add(vocab, callback) {
        if (!vocab || !vocab.word) { return; }
        var _ref = Vocab.push();
        vocab.id = _ref.key();
        _ref.set(vocab, function(err) {
            if (err) { alert(err); }
            if (callback && typeof callback === "function") { 
                callback(err, vocab); 
            }
        });
    }

    function update(vocab, callback) {
        if (!vocab || !vocab.id || !vocab.word) { return; }
        Vocab.child(vocab.id).update(vocab, function(err) {
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


