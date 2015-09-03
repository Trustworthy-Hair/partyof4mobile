'use strict';

var Back = require('../../components/utils').BackButton;

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var historyTab = React.createClass({
  render: function() {
    return (
      <View> 
        <Back />
        <Text> History</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = historyTab;