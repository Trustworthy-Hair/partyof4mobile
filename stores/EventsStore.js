// EventsStore.js

var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = [];
var _annotations = [];
var _currentEvent = {};

var _storeEvents = function (events) {
  _events = events;
};

var _storeCurrentEvent = function (event) {
  _currentEvent = event;
};

var _storeAnnotations = function(annotations){
  _annotations = annotations;
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
  },

  getAnnotations: function(){
    return _annotations;
  },

  getCurrentEvent: function () {
    return _currentEvent;
  }

});

EventsStore.dispatchToken = Dispatcher.register(function (action) {

  switch(action.type) {

    case ActionTypes.STORE_EVENTS:
      _storeEvents(action.events);
      EventsStore.emitChange();
      break;

    case ActionTypes.STORE_ANNOTATIONS:
      _storeAnnotations(action.annotations);
      EventsStore.emitChange();
      break;

    case ActionTypes.STORE_CURRENT_EVENT:
      _storeCurrentEvent(action.payload);
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;
