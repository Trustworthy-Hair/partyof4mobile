// HostView.js

var React = require('react-native');

var UserView = require('./UserView'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  View
} = React;

var HostView = React.createClass({

  render: function () {
    return (
      <View>
        <Text style={styles.title} >Host</Text>
        <UserView
          user={this.props.host}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  title: styleExtend({
  }, 'font')
});

module.exports = HostView;
