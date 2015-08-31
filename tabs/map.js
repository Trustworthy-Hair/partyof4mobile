'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var MapboxGLMap = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

var mapTab = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
    return {
      center: {
       latitude: 37.7833,
       longitude: -122.4167
      },
      zoom: 13
    }
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
        </View>
        <MapboxGLMap
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={'api token'}
          styleURL={'asset://styles/mapbox-streets-v7.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  header: {
    height: 40,
    backgroundColor: '#ff0000'
  },
  map: {
    flex: 5
  },
  text: {
    padding: 2
  }  
});

module.exports = mapTab;