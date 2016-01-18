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
    }
};