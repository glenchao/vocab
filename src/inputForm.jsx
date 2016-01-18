var React = require("react");
var DefinitionControl = require("./definitionControl");
var VocabStore = require("./vocabStore");

var vocabInputTimer;

var InputForm = React.createClass({
    clearVocabInputTimer: function() {
        window.clearTimeout(vocabInputTimer);
        vocabInputTimer = null;
    },
    changeVocab: function(event) {
        var _this = this;
        var v = this.state.vocab;
        v.vocab = event.target.value;
        this.setState({vocab: v});
        this.clearVocabInputTimer();
        vocabInputTimer = window.setTimeout(function() {
            if (_this.props.onNewVocab && typeof _this.props.onNewVocab === "function") {
                _this.props.onNewVocab(v);
            }
            _this.clearVocabInputTimer();
        }, 500);
    },
    addDefinition: function(event) {
        if (event.key === "Enter") {
            var v = this.state.vocab;
            v.definitions.push(event.target.value);
            event.target.value = "";
            this.setState({vocab: v});
        }
    },
    addExample: function(event) {
        if (event.key === "Enter") {
            var v = this.state.vocab;
            v.examples.push(event.target.value);
            event.target.value = "";
            this.setState({vocab: v});
        }
    },
    onAddVocabSuceeded: function(err, id) {
        var v = this.state.vocab;
        v.id = id;
        if (this.props.onNewVocab && typeof this.props.onNewVocab === "function") {
            this.props.onNewVocab(v);
        }
    },
    save: function() {
        if (this.state.vocab.id) {
            VocabStore.updateVocab(this.state.vocab);
        }
        else {
            VocabStore.addVocab(this.state.vocab, this.onAddVocabSuceeded);
        }
    },
    normalizeVocab: function(v) {
        if (!v) { v = {}; }
        return {
            vocab: {
                id: v.id || "",
                vocab: v.vocab || "",
                definitions: v.definitions || [],
                examples: v.examples || []
            }
        };
    },
    getInitialState: function() {
        return this.normalizeVocab(this.props.vocab);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState(this.normalizeVocab(nextProps.vocab));
    },
    render: function() {
        var vocab = this.state.vocab;
        var definitions = vocab.definitions.map(function(value, index) {
            return <DefinitionControl text={value} key={index} />
        });
        var examples = vocab.examples.map(function(value, index) {
            return <DefinitionControl text={value} key={index}/>
        });
        return <div className="container-fluid" key={vocab.id}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="vocabInput">Vocab</label>
                            <input id="vocabInput" className="form-control" type="text" placeholder="New vocab to add..." onChange={this.changeVocab} value={vocab.vocab}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="definitionInput">Definitions</label>
                            <div className="input-group">
                                <input id="definitionInput" className="form-control" type="text" placeholder="Definition of the vocab..." onKeyUp={this.addDefinition}></input>
                                <div className="input-group-addon"><span className="glyphicon glyphicon-plus"></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            {definitions}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInput">Examples</label>
                            <div className="input-group">
                                <input id="exampleInput" className="form-control" type="text" placeholder="Example usages of the vocab..." onKeyUp={this.addExample}></input>
                                <div className="input-group-addon"><span className="glyphicon glyphicon-plus"></span></div>
                            </div>
                        </div>
                        <div className="form-group">
                            {examples}
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary pull-right" onClick={this.save}>Save</button>
                        </div>
                    </form>
               </div>;
    }
});

module.exports = InputForm;