var React = require("react");
var VocabListItem = require("./vocabListItem");
var VocabStore = require("./vocabStore");

var style = {
    container: {
        height: "100%",
        overflow: "auto",
        paddingBottom: "50px"
    },
    emptyMessage: {
        fontSize: "15pt",
        color: "darkGrey"
    }
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
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            vocabs: this.state.vocabs,
            selectedVocab: nextProps.selectedVocab
        });
    },
    render: function() {
        var _this = this;
        var listItems;
        if (this.state.vocabs.length === 0) {
            listItems = <div style={style.emptyMessage}>You currently have no vocabs added.</div>;
        }
        else {
            listItems = this.state.vocabs.map(function(vocab, index) {
                var bIsSelected = (!!_this.state.selectedVocab && vocab.id === _this.state.selectedVocab.id);
                return <VocabListItem vocab={vocab} onSelected={_this.updateCurrentVocab} isSelected={bIsSelected} key={index} />;
            });
        }

        return <div className="list-group container-fluid" style={style.container}>
                    <h3>Vocab List</h3>
                    {listItems}
               </div>;
    }
});

module.exports = VocabList;