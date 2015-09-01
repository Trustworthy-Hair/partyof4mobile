'use strict';

var config = require('./../config/config.js'),
    Header = require('./header'),
    React  = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var Login = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <Text>Hello World</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
});

module.exports = Login;