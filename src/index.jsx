var React = require("react");
var ReactDOM = require('react-dom');
var Firebase = require("firebase");
var LoginSignupControl = require("./loginSignupControl");
var TopNav = require("./topNav");
var VocabList = require("./vocabList");
var InputForm = require("./inputForm");
var DictionaryFrame = require("./dictionaryFrame");
var Util = require("./util");
var Vocab = require("./VocabModel");

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
    onNewVocabButtonClick: function() {
        this.setState({ vocab: new Vocab() });
    },
    onSelectionChanged: function(vocab) {
        var v = vocab || new Vocab();
        this.setState({ vocab: v });
    },
    getInitialState: function() {
        return { vocab: new Vocab() };
    },
    render: function() {
        var vocab = this.state.vocab;
        return <div>
                    <TopNav onNewVocabButtonClick={this.onNewVocabButtonClick} authData={this.props.authData}/>
                    <div className="container-fluid">
                        <div className="row" style={style.container}> 
                            <div className="col-sm-3" style={style.col}>
                                <VocabList selectedVocabId={vocab.id} onSelectionChanged={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-4" style={style.col}>
                                <InputForm vocab={vocab} onNewVocabCreated={this.onSelectionChanged} onVocabWordChanged={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-5" style={style.col}>
                                <DictionaryFrame word={vocab.word} delay={1000} />
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