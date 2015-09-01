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
    return this.renderEvents(event);
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
    var newData = this.state.events;
    var items = newData.map(function (val) {
      return (
        <ListItem location={val.locationId} status={val.currentActivity}
                  currentSize={val.currentSize} capacity={val.capacity} />
      );
    });

    return (
      <View style={ styles.container }>
        <Header />
        <View>
          { items }
        </View>
      </View>
    );
  }
});

var ListItem = React.createClass({
  render: function() {
    return (
      <View>
        <Text>{this.props.location}</Text>
        <Text>{this.props.status}</Text>
        <Text>{this.props.currentSize}</Text>
        <Text>{this.props.capacity}</Text>
      </View>
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