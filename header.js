'use strict';

var config = require('./config/config.js');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var header = React.createClass({
  render: function() {
    return (
      <View style={ styles.header }>
        <Text style={ styles.headerText }>
          {config.app_name}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: '#2e6a8b',
    paddingTop: 18,
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

module.exports = header;