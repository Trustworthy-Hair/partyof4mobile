'use strict';

var Header = require('../header'),
    React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var listTab = React.createClass({
  getInitialState: function() {
    return {data: [],
            loaded: false};
  },
  getDataFromServer: function() {
    fetch('http://localhost:8000/events.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
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
     var event = this.state.events[0];
     return this.renderMovie(event);

   },

   renderLoadingView: function() {
     return (
      <View style={ styles.container }>
        <Header />
        <Text>Loading</Text>
      </View>
     );
   },

   renderMovie: function(event) {
     return (
      <View style={ styles.container }>
        <Header />
        <View>
          <Text >{event.locationId}</Text>
          <Text >{event.currentActivity}</Text>
        </View>
      </View>
     );
   }
});

var ListItem = React.createClass({
  render: function() {
    return (
      <Text>Hello World2</Text>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
});

module.exports = listTab;