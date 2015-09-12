'use strict';

var React = require('react-native'),
    styleGuide = require('../config/style.js').styleGuide;

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var BackButton = React.createClass({
  render: function() {
    return (
      <View style={styles().view}>
        <TouchableHighlight onPress={this.props.onback} style={styles().back}>
          <Text style={styles(this.props.color).backText}>&lt; Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = function(color) {
  return StyleSheet.create({
    view: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
    back: {
      marginTop: 20,
      height: 40,
      width: 310,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    backText: {
      fontSize: styleGuide.sizes.larger,
      fontFamily: styleGuide.font,
      backgroundColor: 'rgba(0,0,0,0)',
      color: color || 'black'
    },
  })
};

module.exports = {
  BackButton: BackButton
};