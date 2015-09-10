'use strict';

var config = require('./../config/config.js'),
    React  = require('react-native'),
    styleGuide = require('../config/style.js').styleGuide;
    
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
    backgroundColor: styleGuide.colors.main,
    paddingTop: 18,
    alignItems: 'center'
  },
  headerText: {
    color: styleGuide.colors.white,
    fontSize: styleGuide.sizes.main,
    fontWeight: 'bold'
  }
});

module.exports = header;