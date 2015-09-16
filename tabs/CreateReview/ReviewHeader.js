// ReviewHeader.js

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var ReviewHeader = React.createClass({

  render: function () {
    return (
      <View>
        <Text>{this.props.event.Location.name}</Text>
        <Text>Event Over! How was it?</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({

});

module.exports = ReviewHeader;
