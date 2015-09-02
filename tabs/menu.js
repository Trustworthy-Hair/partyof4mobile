'use strict';

var Header = require('../components/header');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var menuTab = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
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

module.exports = menuTab;