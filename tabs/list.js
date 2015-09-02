'use strict';

var Header = require('../components/header'),
    React = require('react-native'),
    config = require('./../config/config.js');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var listTab = React.createClass({
  getInitialState: function() {
    return {events: [],
            locations: [],
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
           };
  },

  getDataFromServer: function() {
    fetch(config.url+'/events')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
    .then(fetch(config.url+'/locations')
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              locations: responseData
            })
          })
          .done())
    .done();
  },

  componentDidMount: function() {
    this.getDataFromServer();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={ styles.container }>
        <Header />
        <View style={ styles.innercontainer }>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
            style={styles.listView}
          />
        </View>
      </View>
    );
   },

  renderLoadingView: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <Text>Loading</Text>
      </View>
    );
  },

  renderEvents: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <ListView
          dataSource={this.state.events}
          renderRow={this.renderEvent}
          style={styles.listView}
        />
      </View>
    );
  },

  renderEvent: function(event) {
    return (
      <View style={styles.innercontainer}>
        <Image
          style={styles.icon}
          source={require('image!restaurant')} />
        <View style={styles.words}>
          <Text>{this.getLocationForEvent(event.locationId)}</Text>
          <Text>{event.currentActivity}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.right}>Current: {event.currentSize}</Text>
          <Text style={styles.right}>Total: {event.capacity}</Text>
        </View>
      </View>
    );
  },

  getLocationForEvent: function(eventId) {
    for (var i = 0; i<this.state.locations.length; i++) {
      if (this.state.locations[i].locationId === eventId) {
        return this.state.locations[i].name;
      }
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  innercontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listView: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight:20,
    paddingBottom: 20,
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  words: {
    padding: 5,
    width:175,
  },
  right: {
    textAlign: 'right'
  },
  icon: {
    backgroundColor: '#2e6a8b',
    borderRadius: 5
  }
});

module.exports = listTab;