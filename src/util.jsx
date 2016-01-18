module.exports = {
    navbarHeight: 72,
    objectToArray: function(obj) {
        var ret = [];
        for (var key in obj) {
            if(obj.hasOwnProperty(key)) {
                obj[key].id = key;
                ret.push(obj[key]);
            }
        }
        return ret;
    },
    getBrowserDimensions: function() {
        return {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight|| document.body.clientHeight
        };
    },
    getContentHeight: function() {
        return this.getBrowserDimensions().height - this.navbarHeight;
    },
    getContentWidth: function() {
        return this.getBrowserDimensions().width;
    },
    copyVocab: function(v) {
        return {
            id: v.id,
            vocab: v.vocab,
            definitions: v.definitions.slice(),
            examples: v.examples.slice()
        };
    },
    compareVocabs: function(v1, v2) {
        if (!v1 || !v1.vocab || !v1.definitions || !v1.examples||
            !v2|| !v2.vocab|| !v2.definitions || !v2.examples ||
            v1.id != v2.id ||
            v1.vocab != v2.vocab|| 
            v1.definitions.length != v2.definitions.length||
            v1.examples.length != v2.examples.length) {
            return false;
        }
        var i;
        for (i = 0; i < v1.definitions.length; i++) {
            if (v1.definitions[i] != v2.definitions[i]) {
                return false;
            }
        }
        for (i = 0; i < v1.examples.length; i++) {
            if (v1.examples[i] != v2.examples[i]) {
                return false;
            }
        }
        return true;
    }
};