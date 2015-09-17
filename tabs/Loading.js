// loading.js

var React = require('react-native'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  View
} = React;

var Loading = React.createClass({

  render: function () {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Loading</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  center: styleExtend({}, 'container', 'center'),

  title: styleExtend({}, 'font')
});

module.exports = Loading;
