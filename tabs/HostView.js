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
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title} >Host</Text>
        <UserView
          renderProfile={this.props.renderProfile}
          user={this.props.host}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  title: styleExtend({
    fontWeight: 'bold'
  }, 'font')
});

module.exports = HostView;
