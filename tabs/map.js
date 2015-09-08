'use strict';

var config = require('./../config/config.js');
var MapboxGLMap = require('react-native-mapbox-gl');
var Header = require('../components/header');
var Dispatcher = require ('../dispatcher/dispatcher');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var mapRef = 'mapRef';

var data = UserStore.getData();

var mapTab = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState: function () {
    return {
      center: {
        latitude: 38.8833,
        longitude: -77.0167
      },
      zoom: 13,
      annotations: []
    }
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        this.getDataFromServer();

        var location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        console.log('loc: ', location);
        Dispatcher.dispatch({
          type: ActionTypes.STORE_USER,
          location: location
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    EventsStore.addChangeListener(this._onEventsChange);
  },

  getDataFromServer: function() {
    fetch(config.url+'/locations')
    .then((response) => response.json())
    .then((locations) => locations.map(function(location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: location.name,
        subtitle: location.location,
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
    }))
    .then((annotations) => {
      Dispatcher.dispatch({
        type: ActionTypes.STORE_EVENTS,
        events: annotations
      });
    })
    .done();
  },

  _onEventsChange: function () {
    this.setState({
      annotations: EventsStore.getEvents()
    });
  },

  onOpenAnnotation: function (annotation) {
    console.log(annotation);
  },
  onRightAnnotationTapped: function (e) {
    console.log(e);
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <MapboxGLMap
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={config.mapbox_key}
          styleURL={'asset://styles/mapbox-streets-v7.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}
          annotations={this.state.annotations}
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