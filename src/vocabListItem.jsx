var React = require("react");

var style = {
    fontSize: "13pt",
    
};
var VocabListItem = React.createClass({
    onSelected: function(event) {
        this.props.onSelected(this.props.vocab);
        event.stopPropagation();
        return false;
    },
    render: function() {
        var className = this.props.isSelected ? "list-group-item active" : "list-group-item";
        return <a className={className} href="#" onClick={this.onSelected}>
                    <span style={style}>{this.props.vocab.vocab}</span>
               </a>;
    }
});

module.exports = VocabListItem;