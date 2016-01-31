// simple eventing system based on jQuery
var SimpleDispatcher = function() {
    var _this = this;
    var events = {};

    this.eventTypes = {
        onWordUpdated: "onWordUpdated",
        onVocabSelected: "onVocabSelected",
        onNewVocabCreated: "onNewVocabCreated",
        onNewVocabButtonClicked: "onNewVocabButtonClicked"
    };

    this.register = function(eventType, callback) {
        verifyEventType(eventType);
        $(events).on(eventType, callback);
    };

    this.unregister = function(eventType, callback) {
        verifyEventType(eventType);
        $(events).off(eventType, callback);
    };

    this.trigger = function(eventType, data) {
        verifyEventType(eventType);
        $(events).trigger(eventType, data);
    }

    function verifyEventType(eventType) {
        if (!_this.eventTypes[eventType]) { throw "Invalid event type"; }
        return true;
    }
}

module.exports = new SimpleDispatcher();