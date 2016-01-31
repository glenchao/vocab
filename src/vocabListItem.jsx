var React = require("react");
var Dispatcher = require("./simpleDispatcher");

var style = {
    fontSize: "13pt",
    cursor: "pointer",
    borderRadius: "0px",
    borderLeft: "none", 
    borderRight: "none"
};
var VocabListItem = React.createClass({
    onSelected: function(event) {
        Dispatcher.trigger(Dispatcher.eventTypes.onVocabSelected, this.props.vocab);
        event.stopPropagation();
        return false;
    },
    render: function() {
        var className = this.props.isSelected ? "list-group-item active" : "list-group-item";
        return <a className={className} style={style} onClick={this.onSelected}>
                    <span>{this.props.vocab.word}</span>
               </a>;
    }
});

module.exports = VocabListItem;