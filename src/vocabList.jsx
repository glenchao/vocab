var React = require("react");
var VocabListItem = require("./vocabListItem");
var VocabStore = require("./vocabStore");

var VocabList = React.createClass({
    updateCurrentVocab: function(vocab) {
        this.setState({selectedVocab: vocab});
        // todo: figure out how to stop re-rendering
        if (this.props.onSelectionChanged)
            this.props.onSelectionChanged(vocab);
    },
    getInitialState: function() {
        return {vocabs: [], selectedVocab: {}};
    },
    componentWillMount: function() {
        var _this = this;
        VocabStore.onVocab(function(vocabs) {
            _this.setState({vocabs: vocabs});
        });
    },
    componentWillUnmount: function() {
        VocabStore.offVocab();
    },
    render: function() {
        var _this = this;
        var listItems = this.state.vocabs.map(function(vocab, index) {
            var bIsSelected = (!!_this.state.selectedVocab && vocab.id === _this.state.selectedVocab.id);
            return <VocabListItem vocab={vocab} onSelected={_this.updateCurrentVocab} isSelected={bIsSelected} key={index} />;
        });

        return <div className="list-group">{listItems}</div>;
    }
});

module.exports = VocabList;