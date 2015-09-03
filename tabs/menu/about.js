'use strict';

var Back = require('../../components/common').BackButton;

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
        <Back onback={this.props.onback}/>
        <Text> About</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = aboutTab;