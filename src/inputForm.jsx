var React = require("react");
var Util = require("./util");
var DefinitionControl = require("./definitionControl");
var VocabStore = require("./vocabStore");
var Vocab = require("./vocabModel");
var Dispatcher = require("./simpleDispatcher");

var style = {
    container: {
        maxHeight: "100%",
    },
    title: {
        fontSize: "20pt",
        fontWeight: "bold",
        height: "60px",
        border: "none",
        borderRadius: "0px",
        boxShadow: "none",
        paddingLeft: "0px",
        color: "black"
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
        Dispatcher.trigger(Dispatcher.eventTypes.onWordUpdated, v.word);
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
    save: function() {
        if (this.state.vocab.id) {
            VocabStore.update(this.state.vocab);
        }
        else {
            VocabStore.add(this.state.vocab, function(err, vocab) {
                Dispatcher.trigger(Dispatcher.eventTypes.onNewVocabCreated, vocab);
            });
        }
    },
    delete: function() {
        var _this = this;
        VocabStore.delete(this.state.vocab.id, function() {
            Dispatcher.trigger(Dispatcher.eventTypes.onNewVocabButtonClicked);
        });
    },
    setVocab: function(event, vocab) {
        if (!vocab) { vocab = new Vocab(); }
        this.setState({vocab: vocab});
    },
    getInitialState: function() {
        return {vocab: new Vocab()};
    },
    componentDidMount: function() {
        Dispatcher.register(Dispatcher.eventTypes.onVocabSelected, this.setVocab);
        Dispatcher.register(Dispatcher.eventTypes.onNewVocabButtonClicked, this.setVocab);
    },
    componentWillUnmount: function() {
        Dispatcher.unregister(Dispatcher.eventTypes.onVocabSelected, this.setVocab);
        Dispatcher.unregister(Dispatcher.eventTypes.onNewVocabButtonClicked, this.setVocab);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return !(Util.compareVocabs(this.props.vocab, nextProps.vocab) &&
               Util.compareVocabs(this.state.vocab, nextState.vocab)); 
    },
    render: function() {
        var _this = this;
        var vocab = this.state.vocab;
        
        var definitions;
        if (vocab.definitions) {
            definitions = vocab.definitions.map(function(value, index) {
                return <DefinitionControl key={index} index={index} text={value} onDefinitionUpdated={_this.updateDefinition} />
            });
        }
        
        var examples;
        if (vocab.examples) {
            examples = vocab.examples.map(function(value, index) {
                return <DefinitionControl key={index} index={index} text={value} onDefinitionUpdated={_this.updateExample} />
            });
        }
        // only render delete button is the vocab has already been saved
        var deleteButton = vocab.id ? <button type="button" className="btn btn-danger" style={style.button} onClick={this.delete}>Delete</button> : <span></span>;
        // render
        return <div key={vocab.id} style={style.container}>
                    <form>
                        <div className="form-group">
                            <input id="vocabInput" className="form-control" style={style.title} type="text"
                                   placeholder="Add a new vocab" onChange={this.changeVocab} value={vocab.word}></input>
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