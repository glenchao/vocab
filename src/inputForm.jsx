var React = require("react");
var Util = require("./util");
var DefinitionControl = require("./definitionControl");
var VocabStore = require("./vocabStore");
var Vocab = require("./vocabModel");

var style = {
    container: {
        maxHeight: "100%",
    },
    title: {
        fontSize: "20pt",
        fontWeight: "bold",
        paddingBottom: "20px"
    },
    button: {
        marginLeft: "10px"
    }
};

var InputForm = React.createClass({
    changeVocab: function(event) {
        var _this = this;
        var v = Util.copyVocab(this.state.vocab);
        v.word = event.target.value;
        this.setState({vocab: v});
        if (_this.props.onVocabWordChanged && typeof _this.props.onVocabWordChanged === "function") {
            _this.props.onVocabWordChanged(v);
        }
    },
    addDefinition: function(event) {
        if (event.key === "Enter" && !!event.target.value) {
            var v = Util.copyVocab(this.state.vocab);
            v.definitions.push(event.target.value);
            event.target.value = "";
            this.setState({vocab: v});
        }
    },
    updateDefinition: function(index, text) {
        var v = Util.copyVocab(this.state.vocab);
        if (text) { v.definitions[index] = text; }
        else { v.definitions.splice(index, 1); }
        this.setState({vocab: v});
    },
    addExample: function(event) {
        if (event.key === "Enter"  && !!event.target.value) {
            var v = Util.copyVocab(this.state.vocab);
            v.examples.push(event.target.value);
            event.target.value = "";
            this.setState({vocab: v});
        }
    },
    updateExample: function(index, text) {
        var v = Util.copyVocab(this.state.vocab);
        if (text) { v.examples[index] = text; }
        else { v.examples.splice(index, 1); }
        this.setState({vocab: v});
    },
    onAddVocabSuceeded: function(err, id) {
        var v = this.state.vocab;
        v.id = id;
        if (this.props.onNewVocabCreated && typeof this.props.onNewVocabCreated === "function") {
            this.props.onNewVocabCreated(v);
        }
    },
    save: function() {
        if (this.state.vocab.id) {
            VocabStore.update(this.state.vocab);
        }
        else {
            VocabStore.add(this.state.vocab, this.onAddVocabSuceeded);
        }
    },
    delete: function() {
        var _this = this;
        VocabStore.delete(this.state.vocab.id, function() {
            if (_this.props.onNewVocabCreated && typeof _this.props.onNewVocabCreated === "function") {
                _this.props.onNewVocabCreated();
            }
        });
    },
    getInitialState: function() {
        return {vocab: new Vocab()};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({vocab: nextProps.vocab});
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return !(Util.compareVocabs(this.props.vocab, nextProps.vocab) &&
                 Util.compareVocabs(this.state.vocab, nextState.vocab)); 
    },
    render: function() {
        var _this = this;
        var vocab = this.state.vocab;
        var title = vocab.word || "Add a new vocab";
        var definitions = vocab.definitions.map(function(value, index) {
            return <DefinitionControl key={index} index={index} text={value} onDefinitionUpdated={_this.updateDefinition} />
        });
        var examples = vocab.examples.map(function(value, index) {
            return <DefinitionControl key={index} index={index} text={value} onDefinitionUpdated={_this.updateExample} />
        });
        // only render delete button is the vocab has already been saved
        var deleteButton = vocab.id ? <button type="button" className="btn btn-danger" style={style.button} onClick={this.delete}>Delete</button> : <span></span>;
        // render
        return <div key={vocab.id} style={style.container}>
                    <div style={style.title}>{title}</div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="vocabInput">Vocab</label>
                            <input id="vocabInput" className="form-control" type="text" placeholder="New vocab to add..." onChange={this.changeVocab} value={vocab.word}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="definitionInput">Definitions</label>
                            <input id="definitionInput" className="form-control" type="text" placeholder="Definition of the vocab..." onKeyUp={this.addDefinition}></input>
                        </div>
                        <div className="list-group">
                            {definitions}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInput">Examples</label>
                            <input id="exampleInput" className="form-control" type="text" placeholder="Example usages of the vocab..." onKeyUp={this.addExample}></input>
                        </div>
                        <div className="list-group">
                            {examples}
                        </div>
                        <div className="form-group pull-right">
                            {deleteButton}
                            <button type="button" className="btn btn-primary" style={style.button} onClick={this.save}>Save</button>
                        </div>
                    </form>
               </div>;
    }
});

module.exports = InputForm;