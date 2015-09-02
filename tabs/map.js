'use strict';

var config = require('./../config/config.js');
var MapboxGLMap = require('react-native-mapbox-gl');
var Header = require('../components/header');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var mapRef = 'mapRef';

var mapTab = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
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
      (position) => this.setState({
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.getDataFromServer();
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
      this.setState({
        annotations: annotations
      });
    })
    .done();
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  onRightAnnotationTapped(e) {
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
          annotations={this.state.annotations}/>
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