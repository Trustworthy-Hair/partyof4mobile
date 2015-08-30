/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var mapbox = require('react-native-mapbox-gl');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

var partyof4mobile = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'map'
    }
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Map"
          icon={ require('image!map') }
          selected={ this.state.selectedTab === 'map' }>
          <View>
            <Text>Map Screen</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          icon={ require('image!search') }
          selected={ this.state.selectedTab === 'search' }>
          <View>
            <Text>Search Screen</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="List"
          icon={ require('image!list') }
          selected={ this.state.selectedTab === 'list' }>
          <View>
            <Text>List of Events</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="New"
          icon={ require('image!new') }
          selected={ this.state.selectedTab === 'new' }>
          <View>
            <Text>New Event</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Menu"
          icon={ require('image!menu') }
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
});

AppRegistry.registerComponent('partyof4mobile', () => partyof4mobile);
