'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var profileTab = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onback} style={styles.back}>
          <Text style={styles.backText}>&lt; Back</Text>
        </TouchableHighlight>
        <Text> Profile</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  back: {
    marginTop: 20,
    height: 40,
    width: 310,
  },
  backText: {
    fontSize: 20
  },
});

module.exports = profileTab;