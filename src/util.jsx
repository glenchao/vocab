module.exports = {
    objectToArray: function(obj) {
        var ret = [];
        for (var key in obj) {
            if(obj.hasOwnProperty(key)) {
                obj[key].id = key;
                ret.push(obj[key]);
            }
        }
        return ret;
    }
};