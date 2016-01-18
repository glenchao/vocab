var React = require("react");

var CommandBar = React.createClass({
    onClick: function(event) {
        if (this.props.onNewVocab && typeof this.props.onNewVocab === "function") {
            this.props.onNewVocab();
        }
    },
    render: function() {
        return <div className="btn-toolbar" role="toolbar">
                    <button type="button" className="btn btn-primary" onClick={this.onClick}>New Vocab</button>
               </div>;
    }
});

module.exports = CommandBar;