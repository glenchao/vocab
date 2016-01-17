var React = require("react");
var ReactDOM = require('react-dom');
var TopNav = require("./topNav");
var VocabList = require("./vocabList");
var InputForm = require("./inputForm");

var App = React.createClass({
    render: function() {
        return <div>
                    <TopNav />
                    <div className="container-fluid">
                        <div className="row"> 
                            <div className="col-sm-3">
                                <VocabList />
                            </div>
                            <div className="col-sm-4">
                                <InputForm />
                            </div>
                        </div>
                   </div>
               </div>;
    }
});

ReactDOM.render(<App />, document.getElementById("appContainer"));