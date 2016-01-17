var React = require("react");
var VocabListItem = require("./vocabListItem");
var VocabStore = require("./vocabStore");

var VocabList = React.createClass({
    getInitialState: function() {
        return {vocabs: []};
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
        var listItems = this.state.vocabs.map(function(value, index) {
            return <VocabListItem text={value.vocab} key={index} />;
        });
        return <div>{listItems}</div>;
    }
});

module.exports = VocabList;