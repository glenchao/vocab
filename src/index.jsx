var React = require("react");
var ReactDOM = require('react-dom');
var TopNav = require("./topNav");
var VocabList = require("./vocabList");
var InputForm = require("./inputForm");
var DictionaryFrame = require("./dictionaryFrame");
var Util = require("./util");

var style= {
    container: {
        height: Util.getContentHeight(),
        overflow: "hidden"
    },
    col: {
        height: "100%",
        // overflow: "auto"
    }
};

var App = React.createClass({
    getInitialState: function() {
        return {vocab: null};
    },
    onSelectionChanged: function(vocab) {
        this.setState({vocab: vocab});
    },
    render: function() {
        return <div>
                    <TopNav onNewVocab={this.onSelectionChanged} />
                    <div className="container-fluid">
                        <div className="row" style={style.container}> 
                            <div className="col-sm-3" style={style.col}>
                                <VocabList selectedVocab={this.state.vocab} onSelectionChanged={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-4" style={style.col}>
                                <InputForm vocab={this.state.vocab} onNewVocab={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-5" style={style.col}>
                                <DictionaryFrame vocab={this.state.vocab} />
                            </div>
                        </div>
                   </div>
               </div>;
    }
});

ReactDOM.render(<App />, document.getElementById("appContainer"));