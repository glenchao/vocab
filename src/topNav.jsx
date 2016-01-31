var React = require("react");
var Firebase = require("firebase");
var Util = require("./util");

var ref = new Firebase("https://def.firebaseio.com");
var style = {
    navbar: { borderRadius: "0px" },
    logo: { paddingRight: "30px" },
    button: {
        marginLeft: "10px"
    }
};
var TopNav = React.createClass({
    logout: function() {
        ref.unauth();
    },
    render: function() {
        var displayName = Util.getUserDisplayNameFromAuthData(this.props.authData);
        return <nav className="navbar navbar-inverse navbar-fixed-top" style={style.navbar}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" style={style.logo}>Vocab</a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-commands" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-commands">
                            <div className="nav navbar-nav">
                                <button type="button" className="btn btn-primary navbar-btn" style={style.button} onClick={this.props.onQuizButtonClicked}>
                                    <span className="glyphicon glyphicon-pencil"></span> Quiz
                                </button>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        {displayName} <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" onClick={this.logout}>Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
               </nav>;
    }
});

module.exports = TopNav;