var React = require("react");
var VocabList = require("../vocabList");
var Util = require("../util");

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

var QuizModule = React.createClass({
    render: function() {
        return <div>
                    <div className="container-fluid">
                        <div className="row" style={style.container}> 
                            <div className="col-sm-3" style={style.col}>
                                <VocabList title={"Quiz"}/>
                            </div>
                            <div className="col-sm-4" style={style.col}>
                                Input form
                            </div>
                            <div className="col-sm-5" style={style.col}>
                                Answers
                            </div>
                        </div>
                   </div>
               </div>;
    }
});

module.exports = QuizModule;