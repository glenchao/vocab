var React = require("react");
var Dispatcher = require("./simpleDispatcher");
var VocabListItem = require("./vocabListItem");

var style = {
    container: {
        maxHeight: "100%",
    },
    heading: {
        fontSize: "20pt",
        fontWeight: "bold",
        paddingBottom: "25px"
    },
    emptyMessage: {
        fontSize: "15pt",
        color: "darkGrey"
    }
};

var VocabList = React.createClass({
    onSelectionChanged: function(event, vocab) {
        var _id = vocab ? vocab.id : "";
        this.setState({selectedVocabId: _id});
    },
    getInitialState: function() {
        return {selectedVocabId: ""};
    },
    componentDidMount: function() {
        Dispatcher.register(Dispatcher.eventTypes.onVocabSelected, this.onSelectionChanged);
        Dispatcher.register(Dispatcher.eventTypes.onNewVocabButtonClicked, this.onSelectionChanged);
        Dispatcher.register(Dispatcher.eventTypes.onNewVocabCreated, this.onSelectionChanged);
    },
    componentWillUnmount: function() {
        Dispatcher.unregister(Dispatcher.eventTypes.onVocabSelected, this.onSelectionChanged);
        Dispatcher.unregister(Dispatcher.eventTypes.onNewVocabButtonClicked, this.onSelectionChanged);
        Dispatcher.unregister(Dispatcher.eventTypes.onNewVocabCreated, this.onSelectionChanged);
    },
    render: function() {
        var _this = this;
        var listItems;
        if (!this.props.vocabs || this.props.vocabs.length === 0) {
            // no vocabs
            listItems = <div style={style.emptyMessage}>You currently have no vocabs added.</div>;
        }
        else {
            // has vocabs
            listItems = this.props.vocabs.map(function(vocab, index) {
                var bIsSelected = (!!_this.state.selectedVocabId && vocab.id === _this.state.selectedVocabId);
                return <VocabListItem vocab={vocab} onSelected={_this.onSelectionChanged} isSelected={bIsSelected} key={index} />;
            });
        }

        return <div className="list-group" style={style.container}>
                    <div style={style.heading}>{this.props.title}</div>
                    {listItems}
               </div>;
    }
});

module.exports = VocabList;