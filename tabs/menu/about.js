'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var aboutTab = React.createClass({
  render: function() {
    return (
      <View>
        <Text> About</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = aboutTab;