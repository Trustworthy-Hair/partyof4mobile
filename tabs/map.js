'use strict';

var React = require('react-native');
var config = require('./../config/config.js');
var MapboxGLMap = require('react-native-mapbox-gl');
var Header = require('../components/header');
var SearchBar = require('react-native-search-bar');
var Dispatcher = require ('../dispatcher/dispatcher');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

var GET_NEARBY_EVENTS_REQUEST_URL = config.url + '/events';

var {
  StyleSheet,
  Text,
  View
} = React;

var mapRef = 'mapRef';

var mapTab = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState: function () {
    return {
      center: UserStore.getData().location,
      zoom: 13,
      annotations: [],
      searchQ: ''
    }
  },

  componentDidMount: function() {
    EventsStore.addChangeListener(this._onEventsChange);
    this.getDataFromServer();
  },

  componentWillUnmount: function () {
    EventsStore.removeChangeListener(this._onEventsChange);
  },

  getDataFromServer: function() {
    fetch(
      GET_NEARBY_EVENTS_REQUEST_URL +
      '?latitude=' + this.state.center.latitude +
      '&longitude=' + this.state.center.longitude +
      '&q=' + this.state.searchQ
    )
    .then((response) => response.json())
    .then((events) => {
      Dispatcher.dispatch({
        type: ActionTypes.STORE_EVENTS,
        events: events
      });
      return events.map(function(event) {
        return {
          id: event.id.toString(),
          latitude: event.Location.latitude,
          longitude: event.Location.longitude,
          title: event.Location.name,
          subtitle: event.currentActivity,
          rightCalloutAccessory: {
            url: 'image!restaurant',
            height: 24,
            width: 24
          },
          annotationImage: {
            url: 'image!restaurant',
            height: 24,
            width: 24
          }
        };
      })
    })
    .then((annotations) => {
      Dispatcher.dispatch({
        type: ActionTypes.STORE_ANNOTATIONS,
        annotations: annotations
      });
    })
    .done();
  },

  _onEventsChange: function () {
    this.setState({
      annotations: EventsStore.getAnnotations()
    });
  },
  openEventDetail: function(annotation){
    var id = parseInt(annotation.id);
    var events = EventsStore.getEvents();
    var payload;
    for(var i = 0; i < events.length; i++){
      if(events[i].id === id) payload = events[i];
    }
    Dispatcher.dispatch({
      type: ActionTypes.STORE_CURRENT_EVENT,
      payload: payload
    });
    payload = {};
    payload.currentView = 'eventDetail';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },
  onSearch: function(text) {
    this.setState({
      searchQ: text.replace(/ /g, '%20')
    }, this.getDataFromServer);
  },
  onCancel: function() {
    this.setState({
      searchQ: ''
    }, this.getDataFromServer);
  },
  onRegionChange: function(location) {
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude
    });
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <SearchBar
          onSearchButtonPress={(text) => this.onSearch(text)}
          onCancelButtonPress={this.onCancel}
        />
        <MapboxGLMap
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={config.mapbox_key}
          styleURL={'asset://styles/streets-v8.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}
          annotations={this.state.annotations}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onRegionChange={this.onRegionChange}
          onRightAnnotationTapped={this.openEventDetail}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  map: {
    flex: 5
  },
  text: {
    padding: 2
  }  
});

module.exports = mapTab;