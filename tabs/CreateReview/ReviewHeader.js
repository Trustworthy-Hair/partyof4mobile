// ReviewHeader.js

var React         = require('react-native'),
    stylingHelper = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  View
} = React;

var ReviewHeader = React.createClass({

  render: function () {
    return (
      <View>
        <Text style={styles.heading}>{this.props.event.Location.name}</Text>
        <Text style={styles.text}>Event Over! How was it?</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  heading: styleExtend({
    color: 'black'
  }, 'submitfont'),

  text: styleExtend({
  }, 'font'),
});

module.exports = ReviewHeader;
