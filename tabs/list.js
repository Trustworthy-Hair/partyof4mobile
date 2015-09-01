'use strict';

var Header = require('../header'),
    React = require('react-native');

var {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var listTab = React.createClass({
  getInitialState: function() {
    return {events: [],
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false};
  },

  getDataFromServer: function() {
    fetch('http://localhost:8000/events.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
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
        <View style={styles.words}>
          <Text>{event.locationId}</Text>
          <Text>{event.currentActivity}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.right}>{event.currentSize}</Text>
          <Text style={styles.right}>{event.capacity}</Text>
        </View>
      </View>
    );
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
    width:200,
  },
  right: {
    textAlign: 'right'
  }
});

module.exports = listTab;