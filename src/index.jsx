var React = require("react");
var ReactDOM = require('react-dom');
var Firebase = require("firebase");

var TopNav = require("./topNav");
var StudyModule = require("./roots/studyModule");
var QuizModule = require("./roots/quizModule");
var LoginSignupControl = require("./roots/loginSignupControl");

var appContainer = document.getElementById("appContainer");
var ref = new Firebase("https://def.firebaseio.com");

var App = React.createClass({
    onQuizButtonClicked: function() {
        this.setState({module: <QuizModule />});
    },
    getInitialState: function() {
        return {module: <StudyModule />};
    },
    render: function() {
        return <div>
                    <TopNav authData={this.props.authData} onQuizButtonClicked={this.onQuizButtonClicked} />
                    {this.state.module}
               </div>;
    }
})

ref.onAuth(function (authData) {
    if (authData) {
        ReactDOM.render(<App authData={authData} />, appContainer);
    }
    else {
        ReactDOM.render(<LoginSignupControl />, appContainer);
    }
});