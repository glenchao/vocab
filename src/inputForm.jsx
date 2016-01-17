var React = require("react");
var DefinitionControl = require("./definitionControl");
var VocabStore = require("./vocabStore");

var InputForm = React.createClass({
    changeVocab: function(event) {
        this.setState({vocab: event.target.value});
    },
    addDefinition: function(event) {
        if (event.key === "Enter") {
            var defs = this.state.definitions;
            defs.push(event.target.value);
            this.setState({definitions: defs});
        }
    },
    addExample: function(event) {
        if (event.key === "Enter") {
            var examples = this.state.examples;
            examples.push(event.target.value);
            this.setState({examples: examples});
        }
    },
    save: function() {
        VocabStore.addVocab(this.state.vocab, this.state.definitions, this.state.examples);
    },
    getInitialState: function() {
        return {
            vocab: "",
            definitions: [],
            examples: []
        };
    },
    render: function() {
        var definitions = this.state.definitions.map(function(value, index) {
            return <DefinitionControl text={value} key={index} />
        });
        var examples = this.state.examples.map(function(value, index) {
            return <DefinitionControl text={value} key={index}/>
        })
        return <div className="container-fluid">
                    <form>
                        <div className="form-group">
                            <label htmlFor="vocabInput">Vocab</label>
                            <input id="vocabInput" className="form-control" type="text" placeholder="New vocab to add..." onKeyUp={this.changeVocab}></input>
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