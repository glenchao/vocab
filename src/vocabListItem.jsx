var React = require("react");

var VocabListItem = React.createClass({
    render: function() {
        return <div>{this.props.text}</div>;
    }
});

module.exports = VocabListItem;