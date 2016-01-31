var React = require("react");
var TopNav = require("../topNav");
var VocabList = require("../vocabList");
var CommandBar = require("../commandBar");
var InputForm = require("../inputForm");
var DictionaryFrame = require("../dictionaryFrame");
var Util = require("../util");
var Vocab = require("../vocabModel");
var VocabStore = require("../vocabStore");

var style= {
    container: {
        height: Util.getContentHeight()
    },
    col: {
        maxHeight: "calc(100% - 25px)",
        overflow: "auto",
        marginTop: "70px"
    }
};

var StudyModule = React.createClass({
    updateVocabList: function(vocabs) {
        this.setState({ vocabs: vocabs });
    },
    getInitialState: function() {
        return { 
            vocabs: {}
        };
    },
    componentDidMount: function() {
        VocabStore.on("value", this.updateVocabList);
    },
    componentWillUnmount: function() {
        VocabStore.off("value", this.updateVocabList);
    },
    render: function() {
        var vocabs = Util.vocabObjectsToArray(this.state.vocabs).reverse();
        return <div className="container-fluid">
                    <div className="row" style={style.container}>
                        <div className="col-sm-3" style={style.col}>
                            <CommandBar /> 
                            <VocabList vocabs={vocabs} />
                        </div>
                        <div className="col-sm-4" style={style.col}>
                            <InputForm />
                        </div>
                        <div className="col-sm-5" style={style.col}>
                            <DictionaryFrame delay={1000} />
                        </div>
                    </div>
               </div>;
    }
});

module.exports = StudyModule;