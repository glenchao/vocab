var React = require("react");
var ReactDOM = require('react-dom');
var TopNav = require("./topNav");
var VocabList = require("./vocabList");
var InputForm = require("./inputForm");

var App = React.createClass({
    getInitialState: function() {
        return {vocab: {}};
    },
    onSelectionChanged: function(vocab) {
        this.setState({vocab: vocab});
    },
    render: function() {
        return <div>
                    <TopNav />
                    <div className="container-fluid">
                        <div className="row"> 
                            <div className="col-sm-3">
                                <VocabList onSelectionChanged={this.onSelectionChanged} />
                            </div>
                            <div className="col-sm-4">
                                <InputForm vocab={this.state.vocab}/>
                            </div>
                        </div>
                   </div>
               </div>;
    }
});

ReactDOM.render(<App />, document.getElementById("appContainer"));