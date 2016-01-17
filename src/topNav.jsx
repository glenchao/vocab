var React = require("react");

var TopNav = React.createClass({
    render: function() {
        return <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Vocab</a>
                    </div>
               </nav>;
    }
});

module.exports = TopNav;