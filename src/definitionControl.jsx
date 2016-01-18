var React = require("react");
var ReactDOM = require("react-dom");

var style = {
    viewContainer: {
        fontSize: "12pt",
        paddingBottom: "15px",
        cursor: "pointer",
        borderRadius: "0px",
        borderLeft: "none",
        borderRight: "none"
    },
    editContainer: {
        fontSize: "12pt",
        paddingBottom: "15px"
    }
};

var DeifnitionControl = React.createClass({
    onChange: function(event) {
        this.setState({
            text: event.target.value,
            editMode: true
        });
    },
    updateDefinition: function(event) {
        if (event.key === "Enter" || event.type === "blur") {
            var _this = this;
            if (this.props.text != this.state.text && 
                this.props.onDefinitionUpdated && 
                typeof this.props.onDefinitionUpdated === "function") {
                this.props.onDefinitionUpdated(this.props.index, this.state.text);
            }
        }
    },
    delete: function() {
        if (this.props.onDefinitionUpdated && typeof this.props.onDefinitionUpdated === "function") {
            this.props.onDefinitionUpdated(this.props.index, "");
        }
    },
    switchToEditMode: function() {
        if (this.isMounted())
            this.setState({editMode: true});
    },
    switchToViewMode: function() {
        if (this.isMounted())
            this.setState({editMode: false});
    },
    getInitialState: function() {
        return {
            text: this.props.text,
            editMode: false
        };
    },
    componentDidUpdate: function() {
        if (this.state.editMode) {
            var node = ReactDOM.findDOMNode(this);
            if (node) {
                node = node.getElementsByClassName("form-control")[0];
                node.focus();
            }
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            text: nextProps.text,
            editMode: false
        });
    },
    render: function() {
        if (this.state.editMode) {
            return <div style={style.editContainer} className="input-group">
                        <input type="text" className="form-control" value={this.state.text} 
                               onChange={this.onChange} onBlur={this.updateDefinition} onKeyUp={this.updateDefinition}></input>
                        <span className="input-group-btn">
                            <button className="btn btn-danger" type="button" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span></button>
                        </span>
                   </div>;
        }
        else {
            return <div className="list-group-item" style={style.viewContainer} onClick={this.switchToEditMode}>{this.state.text}</div>;
        }
    }
});

module.exports = DeifnitionControl;