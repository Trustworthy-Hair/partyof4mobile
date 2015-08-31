'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var menuTab = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text>partyof4</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  header: {
    height: 40,
    backgroundColor: '#2e6a8b',
    paddingTop: 20,
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

module.exports = menuTab;