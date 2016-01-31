var React = require("react");
var Dispatcher = require("./simpleDispatcher");

var style = {
    button: {}
};

var CommandBar = React.createClass({
    newVocabButtonClick: function() {
        Dispatcher.trigger(Dispatcher.eventTypes.onNewVocabButtonClicked);
    },
    render: function() {
        return <div>
                    <button type="button" className="btn btn-success navbar-btn" style={style.button} onClick={this.newVocabButtonClick}>
                        <span className="glyphicon glyphicon-plus"></span> New Vocab
                    </button>
               </div>
    }
});

module.exports = CommandBar;