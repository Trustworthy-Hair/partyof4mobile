'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var BackButton = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onback} style={styles.back}>
          <Text style={styles.backText}>&lt; Back</Text>
        </TouchableHighlight>
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

module.exports = {
  BackButton: BackButton
};