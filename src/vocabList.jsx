var React = require("react");
var VocabListItem = require("./vocabListItem");
var VocabStore = require("./vocabStore");

var style = {
    height: "100%",
    overflow: "auto",
    paddingBottom: "50px"
};

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
        VocabStore.on(function(vocabs) {
            _this.setState({vocabs: vocabs.reverse()});
        });
    },
    componentWillUnmount: function() {
        VocabStore.off();
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.selectedVocab) {
            this.setState({
                vocabs: this.state.vocabs,
                selectedVocab: nextProps.selectedVocab
            });
        }
    },
    render: function() {
        var _this = this;
        var listItems = this.state.vocabs.map(function(vocab, index) {
            var bIsSelected = (!!_this.state.selectedVocab && vocab.id === _this.state.selectedVocab.id);
            return <VocabListItem vocab={vocab} onSelected={_this.updateCurrentVocab} isSelected={bIsSelected} key={index} />;
        });

        return <div className="list-group container-fluid" style={style}>{listItems}</div>;
    }
});

module.exports = VocabList;