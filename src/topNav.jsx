var React = require("react");
var CommandBar = require("./commandBar");

var style = {
    navbar: { borderRadius: "0px" },
    logo: { paddingRight: "30px" }
};
var TopNav = React.createClass({
    render: function() {
        return <nav className="navbar navbar-inverse" style={style.navbar}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#" style={style.logo}>Vocab</a>
                        <CommandBar onNewVocab={this.props.onNewVocab} />
                    </div>
               </nav>;
    }
});

module.exports = TopNav;