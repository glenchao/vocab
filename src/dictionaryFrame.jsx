var React = require("react");
var Dispatcher = require("./simpleDispatcher");

var wordApiPath = 'https://wordsapiv1.p.mashape.com';
var apiKey = "2Tg5smk9qJmshShmeHeiHgQWKKJmp1wmOsZjsnoisK3hxKSniY";

var style = {
    frame: {
        height: "100%",
        width: "100%",
        overflow: "auto"
    },
    panelHeader: {
        fontWeight: "bold",
        fontStyle: "italic"
    },
    sectionHeader: {
        fontSize: "15pt",
        paddingBottom: "10px"
    },
    component: {
        paddingBottom: "20px"
    }
};

var requestTypes = {
    words: "/words/",
    definitions: "/definitions/",
    examples: "/examples/"
};

function getRequestUrl(type, word) {
    return wordApiPath + type + word;
}

var DefinitionComponent = React.createClass({
    renderArrays: function(title, array) {
        if (!array) { return <div></div>; }

        var components = array.map(function(value, index) {
            return <li key={index}>{value}</li>;
        });

        return <div style={style.component}>
                    <div style={style.sectionHeader}>{title}</div>
                    <ul>{components}</ul>
               </div>
    },
    render: function() {
        var data = this.props.data;
        if (!data) { return <div></div>; }
        
        var examples = this.renderArrays("Examples", data.examples);
        var synonyms = this.renderArrays("Synonyms", data.synonyms);

        return <div className="panel panel-default">
                    <div className="panel-heading" style={style.panelHeader}>
                        {data.partOfSpeech}.
                    </div>
                    <div className="panel-body">
                        <div style={style.component}>
                            <div style={style.sectionHeader}>Definition</div>
                            <div>{data.definition}</div>
                        </div>
                        {examples}
                        {synonyms}
                    </div>
               </div>;
    }
});

var vocabInputTimer;
var DictionaryFrame = React.createClass({
    onVocabSelected: function(event, vocab) {
        var word = vocab ? vocab.word : "";
        this.onWordUpdated(event, word);
    },
    onWordUpdated: function(event, word) {
        var _this = this;
        var delay = this.props.delay || 0;
        if (word && typeof word === "string") {
            window.clearTimeout(vocabInputTimer);
            vocabInputTimer = window.setTimeout(function() {
                _this.makeWordRequest(word, function(data) {
                    _this.setState(data);
                });
            }, delay);
        }
        else {
            this.setState({results: []});
        }
    },
    makeWordRequest: function(word, callback) {
        var empty = {word: "", results: []};
        if (!word) { callback(empty); return; }

        var _this = this;
        $.ajax({
            url: getRequestUrl(requestTypes.words, word), 
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                callback(data);
            },
            error: function(err) { 
                callback(empty);
             },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
            }
        });
    },
    getInitialState: function() {
        return {results: []};
    },
    componentDidMount: function() {
        Dispatcher.register(Dispatcher.eventTypes.onWordUpdated, this.onWordUpdated);
        Dispatcher.register(Dispatcher.eventTypes.onVocabSelected, this.onVocabSelected);
        Dispatcher.register(Dispatcher.eventTypes.onNewVocabButtonClicked, this.onVocabSelected);
    },
    componentWillUnmount: function() {
        Dispatcher.unregister(Dispatcher.eventTypes.onWordUpdated, this.onWordUpdated);
        Dispatcher.unregister(Dispatcher.eventTypes.onVocabSelected, this.onVocabSelected);
        Dispatcher.unregister(Dispatcher.eventTypes.onNewVocabButtonClicked, this.onVocabSelected);
    },
    renderDefinitionComponents: function(components) {
        if (!components || components.length === 0) { return <div></div>; }

        return components.map(function(value, index) {
            return <DefinitionComponent key={index} data={value}/>;
        });
    },
    render: function() {
        var components = this.renderDefinitionComponents(this.state.results);
        return <div style={style.frame}>{components}</div>;
    }
});

module.exports = DictionaryFrame;