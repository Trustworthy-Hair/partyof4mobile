'use strict';

var config = require('./../config/config.js'),
    React  = require('react-native'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;
    
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
    backgroundColor: styleGuide.colors.main,
    paddingTop: 18,
    height: 40,
    alignItems: 'center'
  },
  headerText: styleExtend({
    color: styleGuide.colors.white
  }, 'font')
});

module.exports = header;