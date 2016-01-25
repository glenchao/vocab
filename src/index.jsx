var React = require("react");
var ReactDOM = require('react-dom');
var Firebase = require("firebase");
var LoginSignupControl = require("./loginSignupControl");
var TopNav = require("./topNav");
var VocabList = require("./vocabList");
var InputForm = require("./inputForm");
var DictionaryFrame = require("./dictionaryFrame");
var Util = require("./util");

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

var App = React.createClass({
    getInitialState: function() {
        return {vocab: null};
    },
    onVocabChanged: function(vocab) {
        
    },
    onSelectionChanged: function(vocab) {
        this.setState({vocab: vocab});
    },
    render: function() {
        var word = this.state.vocab ? this.state.vocab.vocab : "";
        return <div>
                    <TopNav onNewVocab={this.onSelectionChanged} authData={this.props.authData}/>
                    <div className="container-fluid">
                        <div className="row" style={style.container}> 
                            <div className="col-sm-3" style={style.col}>
                                <VocabList selectedVocab={this.state.vocab} onSelectionChanged={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-4" style={style.col}>
                                <InputForm vocab={this.state.vocab} onNewVocab={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-5" style={style.col}>
                                <DictionaryFrame word={word} />
                            </div>
                        </div>
                   </div>
               </div>;
    }
});

var appContainer = document.getElementById("appContainer");
var ref = new Firebase("https://def.firebaseio.com");

ref.onAuth(function (authData) {
    if (authData) {
        ReactDOM.render(<App authData={authData} />, appContainer);
    }
    else {
        ReactDOM.render(<LoginSignupControl />, appContainer);
    }
});