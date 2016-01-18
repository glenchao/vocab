var React = require("react");

var CommandBar = React.createClass({
    onClick: function(event) {
        if (this.props.onNewVocab && typeof this.props.onNewVocab === "function") {
            this.props.onNewVocab();
        }
    },
    render: function() {
        return <div>
                    <button type="button" className="btn btn-success navbar-btn" onClick={this.onClick}>
                        <span className="glyphicon glyphicon-plus"></span> New Vocab
                    </button>
               </div>;
    }
});

module.exports = CommandBar;