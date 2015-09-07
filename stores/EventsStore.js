// EventsStore.js

var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = [];

var _storeEvents = function (events) {
  _events = events;
};

var EventsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getEvents: function () {
    return _events;
  }

});

EventsStore.dispatchToken = Dispatcher.register(function (action) {

  switch(action.type) {

    case ActionTypes.STORE_EVENTS:
      _storeEvents(action.events);
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;
