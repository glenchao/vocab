var React = require("react");
var Firebase = require("firebase");
var CommandBar = require("./commandBar");
var Util = require("./util");

var ref = new Firebase("https://def.firebaseio.com");
var style = {
    navbar: { borderRadius: "0px" },
    logo: { paddingRight: "30px" }
};
var TopNav = React.createClass({
    logout: function() {
        ref.unauth();
    },
    render: function() {
        var displayName = Util.getUserDisplayNameFromAuthData(this.props.authData);
        return <nav className="navbar navbar-inverse" style={style.navbar}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" style={style.logo}>Vocab</a>
                        </div>
                        <div className="nav navbar-nav">
                            <CommandBar onNewVocab={this.props.onNewVocab} />
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
               </nav>;
    }
});

module.exports = TopNav;