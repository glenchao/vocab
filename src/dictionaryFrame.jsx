var React = require("react");

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

var DictionaryFrame = React.createClass({
    makeWordRequest: function(word, callback) {
        var _this = this;
        $.ajax({
            url: getRequestUrl(requestTypes.words, word), 
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                callback(data);
            },
            error: function(err) { 
                callback({word: "", results: []});
             },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
            }
        });
    },
    makeExamplesRequest: function(word, callback) {
        var _this = this;
        $.ajax({
            url: getRequestUrl(requestTypes.examples, word), 
            type: 'GET',
            dataType: 'json',
            success: function(data) { 
                console.log(data);
                callback(data); 
            },
            error: function(err) { 
                callback({word: "", results: []}); 
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
            }
        });
    },
    getInitialState: function() {
        return {word: this.props.word, results: []};
    },
    componentWillReceiveProps: function(nextProps) {
        var _this = this;
        this.makeWordRequest(nextProps.word, function(data) {
            _this.setState(data);
        });
    },
    renderDefinitionComponents: function(components) {
        if (!components) { return <div></div>; }

        return components.map(function(value, index) {
            return <DefinitionComponent key={index} data={value}/>;
        });
    },
    render: function() {
        var components = this.renderDefinitionComponents(this.state.results);
        return <div style={style.frame} className="container-fluid">{components}</div>;
    }
});

module.exports = DictionaryFrame;