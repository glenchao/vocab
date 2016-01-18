var React = require("react");

var style = {
    fontSize: "13pt",
    cursor: "pointer"
};
var VocabListItem = React.createClass({
    onSelected: function(event) {
        this.props.onSelected(this.props.vocab);
        event.stopPropagation();
        return false;
    },
    render: function() {
        var className = this.props.isSelected ? "list-group-item active" : "list-group-item";
        return <a className={className} style={style} onClick={this.onSelected}>
                    <span>{this.props.vocab.vocab}</span>
               </a>;
    }
});

module.exports = VocabListItem;