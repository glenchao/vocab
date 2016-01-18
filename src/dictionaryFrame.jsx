var React = require("react");

var style = {
    frame: {
        height: "100%",
        width: "100%"
    }
};
var dictionaryFrame = React.createClass({
    makeDictionaryDotComUrl: function(text) {
        return text ? "http://dictionary.reference.com/browse/" + text : "";
    },
    render: function() {
        var text = this.props.vocab ? this.props.vocab.vocab : "";
        var url = this.makeDictionaryDotComUrl(text);
        if (url) {
            return <iframe src={url} style={style.frame}></iframe>;
        }
        else {
            return <span></span>;
        }
    }
});

module.exports = dictionaryFrame;