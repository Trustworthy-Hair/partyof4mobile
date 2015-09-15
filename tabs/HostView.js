// HostView.js

var React = require('react-native');

var UserView = require('./UserView');

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
  title: {

  }
});

module.exports = HostView;
