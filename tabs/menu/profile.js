'use strict';

var Back = require('../../components/common').BackButton;

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
        <Back onback={this.props.onback}/>
        <Text> Profile</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = profileTab;