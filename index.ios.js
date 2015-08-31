/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var MapboxGLMap = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

var partyof4mobile = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
    return {
      selectedTab: 'map',
      center: {
       latitude: 37.7833,
       longitude: -122.4167
      },
      zoom: 13,
    };
  },
  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Map"
          icon={ require('image!map') }
          onPress={ () => this.changeTab('map') }
          selected={ this.state.selectedTab === 'map' }>
          <View style={ styles.container }>
            <MapboxGLMap
              style={styles.map}
              direction={0}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsUserLocation={true}
              ref={mapRef}
              accessToken={'pk.eyJ1Ijoid3JybnduZyIsImEiOiJkNWQ1YWQzMmYyN2FlMjBkMTc3YzFmNzBkZjIzNTMyNCJ9.l1-x0zBzkUC-NBYwf_yaFg'}
              styleURL={'asset://styles/mapbox-streets-v7.json'}
              centerCoordinate={this.state.center}
              userLocationVisible={true}
              zoomLevel={this.state.zoom}/>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          icon={ require('image!search') }
          onPress={ () => this.changeTab('search') }
          selected={ this.state.selectedTab === 'search' }>
          <View>
            <Text>Search Screen</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="List"
          icon={ require('image!list') }
          onPress={ () => this.changeTab('list') }
          selected={ this.state.selectedTab === 'list' }>
          <View>
            <Text>List of Events</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="New"
          icon={ require('image!new') }
          onPress={ () => this.changeTab('new') }
          selected={ this.state.selectedTab === 'new' }>
          <View>
            <Text>New Event</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Menu"
          icon={ require('image!menu') }
          onPress={ () => this.changeTab('menu') }
          selected={ this.state.selectedTab === 'menu' }>
          <View>
            <Text>Hamburger!</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
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

AppRegistry.registerComponent('partyof4mobile', () => partyof4mobile);
